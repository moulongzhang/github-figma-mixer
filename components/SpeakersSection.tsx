const speakers = [
  {
    name: "谷 拓樹",
    role: "Designer Advocate",
    company: "Figma Japan株式会社",
    image:
      "https://www.figma.com/api/mcp/asset/ff00e395-6120-4ef8-9637-1c75800d1e6f",
  },
  {
    name: "William Zhang",
    role: "SE",
    company: "GitHub",
    image:
      "https://www.figma.com/api/mcp/asset/5f56d434-dbb4-4e8f-9b20-10c347d108ef",
  },
];

export default function SpeakersSection() {
  return (
    <section id="speakers" className="py-16 bg-[#f9fafb]">
      <div className="max-w-[960px] mx-auto px-4">
        <h2 className="text-5xl font-bold text-black mb-2">登壇者</h2>
        <p className="text-base text-[#57606a] mb-2">（敬称略）</p>
        <p className="text-base text-[#57606a] mb-8">
          登壇者は追加が決まり次第、掲載いたします。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="bg-white border border-[#e5e7eb] rounded-xl py-8 px-8 flex flex-col items-center"
            >
              {/* Avatar */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-32 h-32 rounded-full object-cover mb-6"
              />
              <p className="text-[18px] font-bold text-black text-center mb-1">
                {speaker.name}
              </p>
              <p className="text-sm text-[#57606a] text-center">
                {speaker.role}
              </p>
              <p className="text-sm text-[#57606a] text-center">
                {speaker.company}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

  );
}
  );
}
