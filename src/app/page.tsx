import Image from "next/image";
import ChatBot from "./components/ChatBot";

const heroImage =
  "https://www.figma.com/api/mcp/asset/67f33af7-96af-4cb2-8fcd-8b8eedbec74e";
const speakerTani =
  "https://www.figma.com/api/mcp/asset/57a88b52-76e4-471a-8f23-59c726a974e4";
const speakerWilliam =
  "https://www.figma.com/api/mcp/asset/e85f04bb-529f-4963-be66-56de33c2f99a";
const mapImage =
  "https://www.figma.com/api/mcp/asset/c16bd2e2-127a-457c-b37c-9746c67e8cb4";
const githubIcon =
  "https://www.figma.com/api/mcp/asset/d8c8d435-5905-494a-874f-bc7041485e6e";
const xIcon =
  "https://www.figma.com/api/mcp/asset/19d9d25e-e8aa-4657-948c-1d20b971472a";
const githubLogo =
  "https://www.figma.com/api/mcp/asset/c68ca4a6-5e21-4d3a-aa9e-86db86bc01fd";

const agendaItems = [
  {
    date: "3月19日",
    time: "18:30 - 21:00 JST",
    title: "GitHub x Figma Mixer",
  },
  {
    date: "3月19日",
    time: "18:30 - 19:00 JST",
    title: "受付 / Check In",
  },
  {
    date: "3月19日",
    time: "19:00 - 19:05 JST",
    title: "開始のご挨拶 / Opening remarks",
  },
  {
    date: "3月19日",
    time: "19:30 - 19:40 JST",
    title: "FigmaとGitHub Copilotでコードとデザインの意図をつなぐ",
    speaker: speakerTani,
  },
  {
    date: "3月19日",
    time: "19:50 - 20:00 JST",
    title: "GitHub最新情報",
    speaker: speakerWilliam,
  },
  {
    date: "3月19日",
    time: "20:10 - 20:25 JST",
    title: "お楽しみイベント",
  },
  {
    date: "3月19日",
    time: "20:50 - 20:55 JST",
    title: "クロージング / Closing",
  },
];

const faqItems = [
  {
    question: "このイベントの目的は何ですか？",
    answer:
      "GitHub × Figma Mixerは、エンジニアとデザイナーが職種の垣根を越えてつながることを目的としたネットワーキングイベントです。GitHubとFigmaにより、コードとデザインの融合をテーマに、参加者同士のカジュアルな交流の場を提供します。",
  },
  {
    question: "本イベントの参加資格は何ですか？",
    answer:
      "本イベントは招待制です。参加をご希望の方は御社担当のGitHub営業までお問い合わせください。",
  },
  {
    question: "参加登録はどのような流れですか？",
    answer:
      '本ウェブサイトの「参加登録依頼」フォームに記入して送信してください。送信したのみでは参加は確定していません。参加確定された方には確定Eメールと当日のチェックインに必要なQRコードをお送りします。',
  },
];

const speakers = [
  {
    name: "谷 拓樹",
    role: "Designer Advocate",
    company: "Figma Japan株式会社",
    image: speakerTani,
  },
  {
    name: "William Zhang",
    role: "SE",
    company: "GitHub",
    image: speakerWilliam,
  },
];

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2.5"
        y="3.333"
        width="15"
        height="15"
        rx="2"
        stroke="#57606a"
        strokeWidth="1.5"
      />
      <path d="M2.5 8.333h15" stroke="#57606a" strokeWidth="1.5" />
      <path d="M6.667 1.667v3.333" stroke="#57606a" strokeWidth="1.5" />
      <path d="M13.333 1.667v3.333" stroke="#57606a" strokeWidth="1.5" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#e5e7eb] bg-white px-8">
        <a href="#" className="shrink-0">
          <Image
            src={githubLogo}
            alt="GitHub"
            width={32}
            height={32}
            unoptimized
          />
        </a>
        <div className="flex gap-6">
          <a
            href="#agenda"
            className="text-sm text-[#57606a] hover:text-black transition-colors"
          >
            アジェンダ
          </a>
          <a
            href="#speakers"
            className="text-sm text-[#57606a] hover:text-black transition-colors"
          >
            登壇者
          </a>
          <a
            href="#faq"
            className="text-sm text-[#57606a] hover:text-black transition-colors"
          >
            FAQ
          </a>
          <a
            href="#location"
            className="text-sm text-[#57606a] hover:text-black transition-colors"
          >
            場所
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[600px] w-full overflow-hidden">
          <Image
            src={heroImage}
            alt="GitHub + Figma Mixer"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Date & Venue Banner */}
        <div className="flex flex-col items-center bg-black px-4 py-12 text-white">
          <h2 className="text-3xl font-bold tracking-wide">
            2026年3月19日木曜
          </h2>
          <p className="mt-4 text-xl">SPRING VALLEY BREWERY TOKYO</p>
          <p className="mt-3 text-base opacity-80">
            定員に達しましたので受付を終了しました。参加が承認された方には確定Eメールが送られます。
          </p>
        </div>

        {/* Event Description */}
        <div className="mx-auto max-w-[925px] bg-[#f3f4f6] px-4 py-12">
          <div className="mx-auto max-w-[893px]">
            <h2 className="text-4xl font-bold leading-tight">
              GitHub + Figma Mixer — Spring Merge: Where Code Meets Design
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#57606a]">
              コードとデザインが交わる春の夜、GitHubとFigmaが開催するネットワーキングイベントです。
            </p>
            <p className="mt-2 text-lg leading-relaxed text-[#57606a]">
              ドリンクを片手に、開発者とデザイナーが垣根を越えてつながるカジュアルなミキサーイベントです。皆さまのご参加をお待ちしています。
            </p>
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section id="agenda" className="mx-auto max-w-[925px] px-4 py-16">
        <h2 className="text-5xl font-bold">アジェンダ</h2>
        <p className="mt-4 text-base text-[#57606a]">
          確定次第更新されます。アジェンダは予告なく変更される場合があることをご了承ください。
        </p>
        <div className="mt-10 flex flex-col gap-4">
          {agendaItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between rounded-lg border border-[#e5e7eb] bg-white p-6"
            >
              <div className="flex-1">
                <p className="text-sm text-[#57606a]">{item.date}</p>
                <p className="mt-1 text-sm text-[#57606a]">{item.time}</p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                {item.speaker && (
                  <div className="mt-3">
                    <Image
                      src={item.speaker}
                      alt="Speaker"
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  </div>
                )}
              </div>
              <div className="ml-4 shrink-0">
                <CalendarIcon />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Speakers Section */}
      <section
        id="speakers"
        className="mx-auto max-w-[925px] bg-[#f9fafb] px-4 py-16"
      >
        <h2 className="text-5xl font-bold">登壇者</h2>
        <p className="mt-4 text-base text-[#57606a]">（敬称略）</p>
        <p className="mt-4 text-base text-[#57606a]">
          登壇者は追加が決まり次第、掲載いたします。
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg border border-[#e5e7eb] bg-white p-8"
            >
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={128}
                height={128}
                className="rounded-full object-cover"
                unoptimized
              />
              <h3 className="mt-6 text-lg font-bold">{speaker.name}</h3>
              <p className="mt-2 text-sm text-[#57606a]">{speaker.role}</p>
              <p className="text-sm text-[#57606a]">{speaker.company}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-[925px] px-4 py-16">
        <h2 className="text-5xl font-bold">FAQ</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {faqItems.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold leading-7">{item.question}</h3>
              <p className="mt-3 text-base leading-relaxed text-[#57606a]">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="px-4 py-16">
        <div className="mx-auto max-w-[925px] text-center">
          <h2 className="text-4xl font-bold">SPRING VALLEY BREWERY TOKYO</h2>
          <p className="mt-4 text-base text-[#57606a]">
            〒150-0034 東京都渋谷区代官山町１３−１ ログロード代官山
          </p>
          <div className="mt-12 overflow-hidden rounded-lg">
            <Image
              src={mapImage}
              alt="SPRING VALLEY BREWERY TOKYOへの地図"
              width={893}
              height={405}
              className="w-full object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb] px-4 py-12">
        <div className="mx-auto flex max-w-[893px] flex-col items-center">
          <Image
            src={githubIcon}
            alt="GitHub"
            width={32}
            height={32}
            unoptimized
          />
          <p className="mt-3 text-lg font-semibold">GitHub</p>
          <a
            href="https://x.com/github"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex h-10 w-10 items-center justify-center rounded-full bg-black"
          >
            <Image
              src={xIcon}
              alt="X (Twitter)"
              width={20}
              height={20}
              unoptimized
            />
          </a>
          <p className="mt-6 text-sm text-[#57606a]">
            © 2026 GitHub Inc. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Copilot ChatBot */}
      <ChatBot />
    </div>
  );
}
