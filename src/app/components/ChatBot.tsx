"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const QUICK_ACTIONS = [
  "イベントの日程を教えてください",
  "登録方法について",
  "参加費用はいくらですか？",
];

function CopilotIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z" />
      <path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
        stroke="#25292e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
        stroke="#57606a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.45275 11.625C7.38579 11.3654 7.2505 11.1286 7.06096 10.939C6.87142 10.7495 6.63455 10.6142 6.375 10.5472L1.77375 9.36075C1.69525 9.33847 1.62616 9.29119 1.57696 9.22608C1.52776 9.16098 1.50114 9.0816 1.50114 9C1.50114 8.9184 1.52776 8.83902 1.57696 8.77392C1.62616 8.70881 1.69525 8.66153 1.77375 8.63925L6.375 7.452C6.63446 7.3851 6.87127 7.24993 7.0608 7.06053C7.25033 6.87113 7.38567 6.63442 7.45275 6.375L8.63925 1.77375C8.66131 1.69494 8.70854 1.62551 8.77374 1.57605C8.83894 1.52659 8.91854 1.49981 9.00037 1.49981C9.08221 1.49981 9.16181 1.52659 9.22701 1.57605C9.29221 1.62551 9.33944 1.69494 9.3615 1.77375L10.5472 6.375C10.6142 6.63455 10.7495 6.87142 10.939 7.06096C11.1286 7.2505 11.3654 7.38579 11.625 7.45275L16.2263 8.6385C16.3054 8.66032 16.3752 8.70751 16.4249 8.77281C16.4746 8.83811 16.5015 8.91792 16.5015 9C16.5015 9.08208 16.4746 9.16189 16.4249 9.22719C16.3752 9.29249 16.3054 9.33968 16.2263 9.3615L11.625 10.5472C11.3654 10.6142 11.1286 10.7495 10.939 10.939C10.7495 11.1286 10.6142 11.3654 10.5472 11.625L9.36075 16.2263C9.33869 16.3051 9.29146 16.3745 9.22626 16.424C9.16106 16.4734 9.08146 16.5002 8.99962 16.5002C8.91779 16.5002 8.83819 16.4734 8.77299 16.424C8.70779 16.3745 8.66056 16.3051 8.6385 16.2263L7.45275 11.625Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 2.25V5.25"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 3.75H13.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12.75V14.25"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 13.5H2.25"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <div className="flex gap-1">
        <span className="inline-block h-[6px] w-[6px] animate-bounce rounded-full bg-[#57606a] [animation-delay:0ms]" />
        <span className="inline-block h-[6px] w-[6px] animate-bounce rounded-full bg-[#57606a] [animation-delay:150ms]" />
        <span className="inline-block h-[6px] w-[6px] animate-bounce rounded-full bg-[#57606a] [animation-delay:300ms]" />
      </div>
      <span className="ml-1 text-xs text-[#57606a]">入力中...</span>
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), sessionId }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let assistantContent = "";
      let assistantMessageAdded = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);

            if (data.type === "session" && data.sessionId) {
              setSessionId(data.sessionId);
            } else if (data.type === "delta" && data.content) {
              assistantContent += data.content;
              if (!assistantMessageAdded) {
                assistantMessageAdded = true;
                setMessages((prev) => [
                  ...prev,
                  { role: "assistant", content: assistantContent },
                ]);
              } else {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantContent,
                  };
                  return updated;
                });
              }
            } else if (data.type === "error") {
              setMessages((prev) => [
                ...prev,
                {
                  role: "assistant",
                  content:
                    "申し訳ございません。エラーが発生しました。もう一度お試しください。",
                },
              ]);
            }
          } catch {
            // skip invalid JSON
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "申し訳ございません。接続エラーが発生しました。もう一度お試しください。",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  const showWelcome = messages.length === 0;

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-3 flex w-[340px] flex-col overflow-hidden rounded-lg border border-[#d1d9e0] bg-white shadow-[0px_8px_30px_0px_rgba(0,0,0,0.12)]">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[#d1d9e0] bg-white px-4 py-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#1f883d] text-white">
              <CopilotIcon size={14} />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-[#010409]">
                イベントアシスタント
              </p>
              <p className="text-xs text-[#bf3989]">● オンライン</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[#f6f8fa] transition-colors"
              aria-label="チャットを閉じる"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex h-[400px] flex-col overflow-y-auto bg-[#f6f8fa] px-4 py-4">
            {showWelcome ? (
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(129,139,152,0.12)] text-[#59636e]">
                  <CopilotIcon size={24} />
                </div>
                <p className="mt-4 text-base font-semibold text-[#010409]">
                  ようこそ！
                </p>
                <p className="mt-2 text-center text-xs text-[#59636e]">
                  GitHubイベント登録に関するご質問にお答えします
                </p>
                <div className="mt-6 flex w-full flex-col gap-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="rounded-md border border-[#d1d9e0] bg-white px-3 py-2 text-left text-xs text-[#010409] hover:bg-[#f6f8fa] transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#1f883d] text-white">
                        <CopilotIcon size={12} />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#1f883d] text-white"
                          : "border border-[#d1d9e0] bg-white text-[#010409]"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#1f883d] text-white">
                      <CopilotIcon size={12} />
                    </div>
                    <div className="rounded-lg border border-[#d1d9e0] bg-white">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-[#d1d9e0] bg-white px-3 pt-3 pb-2">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-md border border-[#d1d9e0] bg-white px-3 py-1.5"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="質問を入力してください..."
                className="flex-1 bg-transparent text-sm text-[#010409] outline-none placeholder:text-[rgba(1,4,9,0.5)]"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-7 w-7 items-center justify-center rounded transition-opacity disabled:opacity-40"
                aria-label="送信"
              >
                <SendIcon />
              </button>
            </form>
            <p className="mt-2 text-center text-xs text-[#59636e] opacity-70">
              Powered by GitHub Copilot
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-auto flex h-10 w-10 items-center justify-center rounded-md bg-[#1f883d] shadow-[0px_1px_0px_0px_rgba(31,35,40,0.04)] transition-transform hover:scale-105"
        aria-label={isOpen ? "チャットを閉じる" : "チャットを開く"}
      >
        {isOpen ? (
          <CloseIcon />
        ) : (
          <ChatIcon />
        )}
      </button>
    </div>
  );
}
