export default function Footer() {
  return (
    <footer className="border-t border-[#e5e7eb] bg-white pt-12 pb-10">
      <div className="max-w-[960px] mx-auto px-4 text-center">
        {/* GitHub logo + name */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <svg
            viewBox="0 0 16 16"
            className="h-8 w-8 fill-black"
            aria-hidden="true"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>
          <span className="text-[18px] font-semibold text-black">GitHub</span>
        </div>

        {/* X (Twitter) link */}
        <div className="flex justify-center mb-8">
          <a
            href="https://x.com/github"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub on X"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-[#333] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-white"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        <p className="text-[#57606a] text-sm">
          &copy; 2026 GitHub Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
