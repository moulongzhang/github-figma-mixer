const speakers = [
  {
    name: "谷 拓樹",
    role: "Designer Advocate",
    company: "Figma Japan株式会社",
    initial: "谷",
    gradientFrom: "#f778ba",
    gradientTo: "#bc8cff",
    twitter: "https://twitter.com/hiloki",
    github: null,
  },
  {
    name: "William Zhang",
    role: "Solutions Engineer",
    company: "GitHub",
    initial: "W",
    gradientFrom: "#58a6ff",
    gradientTo: "#3fb950",
    twitter: null,
    github: "https://github.com",
  },
];

export default function SpeakersSection() {
  return (
    <section id="speakers" className="py-12 border-t border-border-subtle">
      <h2 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-text-primary mb-6">
        <svg
          viewBox="0 0 16 16"
          className="w-6 h-6 fill-accent-purple flex-shrink-0"
          aria-hidden="true"
        >
          <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4.001 4.001 0 0 0-6.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 4.6 8.048 3.5 3.5 0 0 1 2 5.5ZM5.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5.5 0a.75.75 0 0 1 .75.75 2.25 2.25 0 0 1 0 4.5.75.75 0 0 1 0-1.5.75.75 0 0 0 0-1.5.75.75 0 0 1-.75-.75Zm1.585 6.533a.75.75 0 0 1 .966-.466 3.527 3.527 0 0 1 1.742 1.32.75.75 0 1 1-1.236.848 2.021 2.021 0 0 0-1.006-.758.75.75 0 0 1-.466-.944Z" />
        </svg>
        登壇者 / Speakers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {speakers.map((speaker) => (
          <div
            key={speaker.name}
            className="bg-bg-card border border-border-default rounded-2xl p-7 transition-all duration-200 hover:border-accent-purple hover:shadow-[0_0_0_1px_#bc8cff,0_8px_24px_rgba(0,0,0,0.3)]"
          >
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4 shrink-0"
              style={{
                background: `linear-gradient(135deg, ${speaker.gradientFrom}, ${speaker.gradientTo})`,
              }}
              aria-hidden="true"
            >
              {speaker.initial}
            </div>

            {/* Info */}
            <div className="text-lg font-bold text-text-primary mb-1">
              {speaker.name}
            </div>
            <div className="text-sm text-text-secondary leading-relaxed">
              {speaker.role}
            </div>
            <div className="text-xs text-text-muted mt-0.5">
              {speaker.company}
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-4">
              {speaker.github && (
                <a
                  href={speaker.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${speaker.name}のGitHub`}
                  className="text-text-muted hover:text-text-secondary transition-colors no-underline"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="w-4 h-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                  </svg>
                </a>
              )}
              {speaker.twitter && (
                <a
                  href={speaker.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${speaker.name}のX (Twitter)`}
                  className="text-text-muted hover:text-text-secondary transition-colors no-underline"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
