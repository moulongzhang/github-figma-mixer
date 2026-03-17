export default function HeroSection() {
  return (
    <section className="bg-white">
      {/* Hero image */}
      <div className="relative w-full overflow-hidden" style={{ height: "600px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.figma.com/api/mcp/asset/ff09bf81-5b16-4899-adbf-7d52ac3c1e0c"
          alt="GitHub + Figma Mixer"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Event info band */}
      <div className="bg-black text-white text-center py-12 px-6">
        <p className="text-[30px] font-bold tracking-wide mb-4">
          2026年3月19日木曜
        </p>
        <p className="text-xl mb-4">SPRING VALLEY BREWERY TOKYO</p>
        <p className="text-base opacity-80">
          定員に達しましたので受付を終了しました。参加が承認された方には確定Eメールが送られます。
        </p>
      </div>

      {/* Event description */}
      <div className="py-16 px-4">
        <div className="max-w-[960px] mx-auto bg-[#f3f4f6] p-8 md:p-10">
          <h1 className="text-[36px] font-bold text-black leading-tight mb-6">
            GitHub + Figma Mixer — Spring Merge: Where Code Meets Design
          </h1>
          <p className="text-[18px] text-[#57606a] mb-4">
            コードとデザインが交わる春の夜、GitHubとFigmaが開催するネットワーキングイベントです。
          </p>
          <p className="text-[18px] text-[#57606a]">
            ドリンクを片手に、開発者とデザイナーが垣根を越えてつながるカジュアルなミキサーイベントです。皆さまのご参加をお待ちしています。
          </p>
        </div>
      </div>
    </section>
  );
}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 30%, rgba(13,17,23,0.7) 70%, #0d1117 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-content mx-auto px-6 pb-12 pt-20 sm:pb-16">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-accent-blue text-xs font-semibold tracking-wide mb-5 border"
          style={{
            background: "rgba(88,166,255,0.15)",
            borderColor: "rgba(88,166,255,0.3)",
          }}
        >
          <svg
            viewBox="0 0 16 16"
            className="w-4 h-4 fill-current"
            aria-hidden="true"
          >
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z" />
          </svg>
          In-Person Event
        </div>

        {/* Title */}
        <h1
          className="text-gradient-brand text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4"
        >
          GitHub x Figma Mixer
        </h1>

        {/* Meta */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 text-text-secondary text-sm">
          <span className="flex items-center gap-2">
            <svg
              viewBox="0 0 16 16"
              className="w-4 h-4 fill-text-muted flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M4.75 0a.75.75 0 0 1 .75.75V2h5V.75a.75.75 0 0 1 1.5 0V2H14.25A1.75 1.75 0 0 1 16 3.75v10.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V3.75A1.75 1.75 0 0 1 1.75 2H4V.75A.75.75 0 0 1 4.75 0ZM1.5 6v8.25c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V6Z" />
            </svg>
            3月19日（水）
          </span>
          <span className="flex items-center gap-2">
            <svg
              viewBox="0 0 16 16"
              className="w-4 h-4 fill-text-muted flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z" />
            </svg>
            18:30 – 21:00 JST
          </span>
          <span className="flex items-center gap-2">
            <svg
              viewBox="0 0 16 16"
              className="w-4 h-4 fill-text-muted flex-shrink-0"
              aria-hidden="true"
            >
              <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z" />
            </svg>
            GitHub Japan Office, Tokyo
          </span>
        </div>
      </div>
    </section>
  );
}
