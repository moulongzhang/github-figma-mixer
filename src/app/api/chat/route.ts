import { CopilotClient, approveAll } from "@github/copilot-sdk";
import { execSync } from "node:child_process";

function findCopilotPath(): string {
  if (process.env.COPILOT_CLI_PATH) {
    return process.env.COPILOT_CLI_PATH;
  }
  try {
    return execSync("which copilot", { encoding: "utf-8" }).trim();
  } catch {
    return "copilot";
  }
}

const SYSTEM_MESSAGE = `あなたは「イベントアシスタント」です。GitHub × Figma Mixer イベントに関する質問に日本語で答えてください。

イベント情報:
- イベント名: GitHub + Figma Mixer — Spring Merge: Where Code Meets Design
- 日時: 2026年3月19日（木）18:30 - 21:00 JST
- 場所: SPRING VALLEY BREWERY TOKYO（〒150-0034 東京都渋谷区代官山町１３−１ ログロード代官山）
- 主催: GitHub と Figma
- 内容: エンジニアとデザイナーが職種の垣根を越えてつながるネットワーキングイベント
- 参加費: 無料（招待制）
- 登録締め切り: 2026年3月25日

アジェンダ:
- 18:30-19:00: 受付 / Check In
- 19:00-19:05: 開始のご挨拶 / Opening remarks
- 19:30-19:40: FigmaとGitHub Copilotでコードとデザインの意図をつなぐ（谷 拓樹 / Figma Japan）
- 19:50-20:00: GitHub最新情報（William Zhang / GitHub）
- 20:10-20:25: お楽しみイベント
- 20:50-20:55: クロージング / Closing

FAQ:
- このイベントは招待制です。参加をご希望の方は御社担当のGitHub営業までお問い合わせください。
- 参加登録はウェブサイトの「参加登録依頼」フォームに記入して送信してください。参加確定された方には確認Eメールと当日のチェックインに必要なQRコードをお送りします。

回答は簡潔に、親切に、丁寧に答えてください。イベントに関係のない質問には、イベントに関する情報のみ提供できると伝えてください。`;

let clientInstance: CopilotClient | null = null;

async function getClient(): Promise<CopilotClient> {
  if (!clientInstance) {
    clientInstance = new CopilotClient({
      cliPath: findCopilotPath(),
    });
    await clientInstance.start();
  }
  return clientInstance;
}

export async function POST(request: Request) {
  const { message } = await request.json();

  if (!message || typeof message !== "string") {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  const client = await getClient();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const session = await client.createSession({
          model: "gpt-4o",
          streaming: true,
          systemMessage: { content: SYSTEM_MESSAGE },
          infiniteSessions: { enabled: false },
          onPermissionRequest: approveAll,
        });

        const currentSessionId = session.sessionId;
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "session", sessionId: currentSessionId })}\n\n`
          )
        );

        const done = new Promise<void>((resolve, reject) => {
          session.on("assistant.message_delta", (event) => {
            const chunk = event.data.deltaContent;
            if (chunk) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "delta", content: chunk })}\n\n`
                )
              );
            }
          });

          session.on("assistant.message", () => {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "done" })}\n\n`
              )
            );
            resolve();
          });

          session.on("session.idle", () => {
            resolve();
          });

          setTimeout(() => reject(new Error("Timeout")), 60000);
        });

        await session.send({ prompt: message });
        await done;
        await session.disconnect();
        controller.close();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "error", error: errorMessage })}\n\n`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
