const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="20"
    height="20"
    fill="#57606a"
    className="shrink-0"
    aria-hidden="true"
  >
    <path d="M2 1.75C2 .784 2.784 0 3.75 0h8.5C13.216 0 14 .784 14 1.75v12.5A1.75 1.75 0 0 1 12.25 16h-8.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25ZM4.75 4a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5A.75.75 0 0 1 4.75 4Zm.75 2.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5Zm0 3a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5Z" />
  </svg>
);

const agendaItems = [
  {
    time: "18:30 - 21:00",
    title: "GitHub x Figma Mixer",
    speakerImage: null,
  },
  {
    time: "18:30 - 19:00",
    title: "受付 / Check In",
    speakerImage: null,
  },
  {
    time: "19:00 - 19:05",
    title: "開始のご挨拶 / Opening remarks",
    speakerImage: null,
  },
  {
    time: "19:30 - 19:40",
    title: "FigmaとGitHub Copilotでコードとデザインの意図をつなぐ",
    speakerImage:
      "https://www.figma.com/api/mcp/asset/ff00e395-6120-4ef8-9637-1c75800d1e6f",
  },
  {
    time: "19:50 - 20:00",
    title: "GitHub最新情報",
    speakerImage:
      "https://www.figma.com/api/mcp/asset/5f56d434-dbb4-4e8f-9b20-10c347d108ef",
  },
  {
    time: "20:10 - 20:25",
    title: "お楽しみイベント",
    speakerImage: null,
  },
  {
    time: "20:50 - 20:55",
    title: "クロージング / Closing",
    speakerImage: null,
  },
];

export default function AgendaSection() {
  return (
    <section id="agenda" className="py-16 bg-white">
      <div className="max-w-[960px] mx-auto px-4">
        <h2 className="text-5xl font-bold text-black mb-4">アジェンダ</h2>
        <p className="text-base text-[#57606a] mb-8">
          確定次第更新されます。アジェンダは予告なく変更される場合があることをご了承ください。
        </p>

        <div className="flex flex-col gap-4">
          {agendaItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#e5e7eb] rounded-xl px-6 pt-6 pb-1 flex items-start justify-between gap-4"
            >
              <div className="flex-1 pb-5">
                <p className="text-[#57606a] text-sm">3月19日</p>
                <p className="text-[#57606a] text-sm mt-1">{item.time} JST</p>
                <h3 className="text-[18px] font-semibold text-black mt-4">
                  {item.title}
                </h3>
                {item.speakerImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.speakerImage}
                    alt=""
                    className="w-8 h-8 rounded-full mt-4 object-cover"
                  />
                )}
              </div>
              <CalendarIcon />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
