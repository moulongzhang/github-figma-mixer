const agendaItems = [
  {
    time: "18:30 – 19:00",
    title: "受付 / Check In",
  },
  {
    time: "19:00 – 19:05",
    title: "開始のご挨拶 / Opening Remarks",
  },
  {
    time: "19:30 – 19:40",
    title: "FigmaとGitHub Copilotでコードとデザインの意図をつなぐ",
  },
  {
    time: "19:50 – 20:00",
    title: "GitHub最新情報",
  },
  {
    time: "20:10 – 20:25",
    title: "お楽しみイベント",
  },
  {
    time: "20:50 – 20:55",
    title: "クロージング / Closing",
  },
];

export default function AgendaSection() {
  return (
    <section id="agenda" className="py-12">
      <h2 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-text-primary mb-6">
        <svg
          viewBox="0 0 16 16"
          className="w-6 h-6 fill-accent-purple flex-shrink-0"
          aria-hidden="true"
        >
          <path d="M2 1.75C2 .784 2.784 0 3.75 0h8.5C13.216 0 14 .784 14 1.75v12.5A1.75 1.75 0 0 1 12.25 16h-8.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25ZM4.75 4a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5A.75.75 0 0 1 4.75 4Zm.75 2.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5Zm0 3a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5Z" />
        </svg>
        アジェンダ / Agenda
      </h2>

      {/* Header banner */}
      <div
        className="flex flex-col sm:flex-row gap-2 sm:gap-4 px-5 py-4 rounded-xl border mb-3"
        style={{
          background:
            "linear-gradient(135deg, rgba(88,166,255,0.08), rgba(188,140,255,0.08))",
          borderColor: "rgba(88,166,255,0.15)",
        }}
      >
        <span className="text-accent-blue font-semibold text-sm font-[tabular-nums] shrink-0">
          18:30 – 21:00
        </span>
        <span className="text-text-primary font-bold text-base">
          GitHub x Figma Mixer
        </span>
      </div>

      {/* Agenda items */}
      <ul className="list-none m-0 p-0">
        {agendaItems.map((item, index) => (
          <li
            key={index}
            className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-4 border-b border-border-subtle last:border-b-0"
          >
            <span className="text-accent-blue font-semibold text-sm font-[tabular-nums] shrink-0 sm:w-36 pt-0.5">
              {item.time}
            </span>
            <span className="text-text-primary text-sm">{item.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
