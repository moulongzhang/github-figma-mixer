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
