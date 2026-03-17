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

