export default function SpeakersSection() {
  const speakers = [
    {
      name: "谷 拓樹",
      role: "Designer Advocate",
      company: "Figma Japan株式会社",
      initial: "谷",
      gradient: "from-accent-pink to-accent-purple",
    },
    {
      name: "William Zhang",
      role: "Solutions Engineer",
      company: "GitHub",
      initial: "W",
      gradient: "from-accent-blue to-accent-green",
    },
  ];

  return (
    <section className="py-9 md:py-12 border-t border-border-subtle">
      <div className="max-w-[960px] mx-auto px-4 md:px-6">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold mb-6 tracking-tight">
          <svg className="w-6 h-6 fill-accent-purple shrink-0" viewBox="0 0 16 16">
            <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4.001 4.001 0 0 0-6.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 4.6 8.048 3.5 3.5 0 0 1 2 5.5ZM5.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5.5 0a.75.75 0 0 1 .75.75 2.25 2.25 0 0 1 0 4.5.75.75 0 0 1 0-1.5.75.75 0 0 0 0-1.5.75.75 0 0 1-.75-.75Zm1.585 6.533a.75.75 0 0 1 .966-.466 3.527 3.527 0 0 1 1.742 1.32.75.75 0 1 1-1.236.848 2.021 2.021 0 0 0-1.006-.758.75.75 0 0 1-.466-.944Z" />
          </svg>
          登壇者 / Speakers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="bg-background-card border border-border rounded-2xl p-7 px-6 transition-all duration-200 hover:border-accent-purple hover:shadow-[0_0_0_1px_#bc8cff,0_8px_24px_rgba(0,0,0,0.3)]"
            >
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${speaker.gradient} flex items-center justify-center text-[22px] font-bold text-white mb-4`}
              >
                {speaker.initial}
              </div>
              <div className="text-lg font-bold mb-1">{speaker.name}</div>
              <div className="text-sm text-text-secondary leading-relaxed">
                {speaker.role}
              </div>
              <div className="text-[13px] text-text-muted mt-0.5">
                {speaker.company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
