import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[360px] md:min-h-[480px] flex items-end overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/cover_full.png"
          alt="GitHub x Figma Mixer"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[960px] mx-auto px-5 md:px-6 pb-9 md:pb-12 pt-15 md:pt-20">
        {/* Event Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-accent-blue text-[13px] font-semibold tracking-wide mb-5">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z" />
          </svg>
          In-Person Event
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 bg-gradient-primary bg-clip-text text-transparent">
          GitHub x Figma Mixer
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-5 text-text-secondary text-[15px]">
          <span className="flex items-center gap-2">
            <svg className="w-[18px] h-[18px] fill-text-muted shrink-0" viewBox="0 0 16 16">
              <path d="M4.75 0a.75.75 0 0 1 .75.75V2h5V.75a.75.75 0 0 1 1.5 0V2H14.25A1.75 1.75 0 0 1 16 3.75v10.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V3.75A1.75 1.75 0 0 1 1.75 2H4V.75A.75.75 0 0 1 4.75 0ZM1.5 6v8.25c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V6Z" />
            </svg>
            3月19日（水）
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-[18px] h-[18px] fill-text-muted shrink-0" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z" />
            </svg>
            18:30 - 21:00 JST
          </span>
        </div>
      </div>
    </section>
  );
}
