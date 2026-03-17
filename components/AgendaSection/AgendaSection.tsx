export default function AgendaSection() {
  const agendaItems = [
    {
      time: "18:30 – 21:00",
      content: "GitHub x Figma Mixer",
      isHeader: true,
    },
    {
      time: "18:30 – 19:00",
      content: "受付 / Check In",
    },
    {
      time: "19:00 – 19:05",
      content: "開始のご挨拶 / Opening Remarks",
    },
    {
      time: "19:30 – 19:40",
      content: "FigmaとGitHub Copilotでコードとデザインの意図をつなぐ",
    },
    {
      time: "19:50 – 20:00",
      content: "GitHub最新情報",
    },
    {
      time: "20:10 – 20:25",
      content: "お楽しみイベント",
    },
    {
      time: "20:50 – 20:55",
      content: "クロージング / Closing",
    },
  ];

  return (
    <section className="py-9 md:py-12 border-t border-border-subtle">
      <div className="max-w-[960px] mx-auto px-4 md:px-6">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold mb-6 tracking-tight">
          <svg className="w-6 h-6 fill-accent-purple shrink-0" viewBox="0 0 16 16">
            <path d="M2 1.75C2 .784 2.784 0 3.75 0h8.5C13.216 0 14 .784 14 1.75v12.5A1.75 1.75 0 0 1 12.25 16h-8.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25ZM4.75 4a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5A.75.75 0 0 1 4.75 4Zm.75 2.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5Zm0 3a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5Z" />
          </svg>
          アジェンダ / Agenda
        </h2>

        <ul className="list-none">
          {agendaItems.map((item, index) => (
            <li
              key={index}
              className={
                item.isHeader
                  ? "flex flex-col md:flex-row gap-1 md:gap-4 px-5 py-4 mb-2 rounded-xl bg-gradient-to-br from-accent-blue/8 to-accent-purple/8 border border-accent-blue/15"
                  : "flex flex-col md:flex-row gap-1 md:gap-4 py-4 border-b border-border-subtle last:border-b-0"
              }
            >
              <span
                className={
                  item.isHeader
                    ? "shrink-0 w-auto md:w-[140px] text-sm font-semibold text-accent-blue tabular-nums pt-0.5"
                    : "shrink-0 w-auto md:w-[140px] text-sm font-semibold text-accent-blue tabular-nums pt-0.5"
                }
              >
                {item.time}
              </span>
              <span
                className={
                  item.isHeader
                    ? "text-base font-bold text-text-primary"
                    : "text-[15px] text-text-primary"
                }
              >
                {item.content}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
