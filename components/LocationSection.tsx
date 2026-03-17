export default function LocationSection() {
  return (
    <section id="location" className="py-16 bg-white">
      <div className="max-w-[960px] mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col gap-4 mb-12 text-center">
          <h2 className="text-[36px] font-bold text-black">
            SPRING VALLEY BREWERY TOKYO
          </h2>
          <p className="text-base text-[#57606a]">
            〒150-0034 東京都渋谷区代官山町１３−１ ログロード代官山
          </p>
        </div>

        {/* Map image */}
        <div className="w-full overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.figma.com/api/mcp/asset/e5fdd6b7-bf9e-488d-a2ac-2da73cedb292"
            alt="Map to SPRING VALLEY BREWERY TOKYO"
            className="w-full object-cover"
            style={{ height: "405px" }}
          />
        </div>
      </div>
    </section>
  );
}
      <h2 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-text-primary mb-6">
        <svg
          viewBox="0 0 16 16"
          className="w-6 h-6 fill-accent-purple flex-shrink-0"
          aria-hidden="true"
        >
          <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z" />
        </svg>
        会場 / Location
      </h2>

      <div className="bg-bg-card border border-border-default rounded-2xl overflow-hidden">
        {/* Map placeholder */}
        <div
          className="w-full h-48 sm:h-64 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(88,166,255,0.06), rgba(188,140,255,0.06))",
          }}
        >
          <div className="text-center">
            <svg
              viewBox="0 0 16 16"
              className="w-10 h-10 fill-text-muted mx-auto mb-3"
              aria-hidden="true"
            >
              <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z" />
            </svg>
            <p className="text-text-muted text-sm">GitHub Japan Office</p>
          </div>
        </div>

        {/* Location info */}
        <div className="p-6 flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-text-primary font-semibold text-base mb-1">
              GitHub Japan Office
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              〒100-0004 東京都千代田区大手町1丁目9番2号
              <br />
              大手町フィナンシャルシティ グランキューブ
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-secondary text-sm">
              <svg
                viewBox="0 0 16 16"
                className="w-4 h-4 fill-text-muted flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M4.75 0a.75.75 0 0 1 .75.75V2h5V.75a.75.75 0 0 1 1.5 0V2H14.25A1.75 1.75 0 0 1 16 3.75v10.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V3.75A1.75 1.75 0 0 1 1.75 2H4V.75A.75.75 0 0 1 4.75 0ZM1.5 6v8.25c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V6Z" />
              </svg>
              3月19日（水）
            </div>
            <div className="flex items-center gap-2 text-text-secondary text-sm">
              <svg
                viewBox="0 0 16 16"
                className="w-4 h-4 fill-text-muted flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z" />
              </svg>
              18:30 – 21:00 JST
            </div>
            <a
              href="https://maps.google.com/?q=GitHub+Japan+Office+Tokyo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent-blue text-sm hover:underline no-underline"
            >
              Google マップで見る
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5 fill-current"
                aria-hidden="true"
              >
                <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
