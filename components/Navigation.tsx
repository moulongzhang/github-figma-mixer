"use client";

import { useState } from "react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#agenda", label: "アジェンダ" },
    { href: "#speakers", label: "登壇者" },
    { href: "#faq", label: "FAQ" },
    { href: "#location", label: "場所" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#e5e7eb] bg-white">
      <div className="max-w-[960px] mx-auto px-8 flex h-[65px] items-center justify-between">
        {/* GitHub Logo */}
        <a href="#" className="flex items-center no-underline">
          <svg
            viewBox="0 0 16 16"
            className="h-8 w-8 fill-black"
            aria-hidden="true"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[#57606a] hover:text-black transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <span className={`block h-0.5 w-5 bg-[#57606a] transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-[#57606a] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-[#57606a] transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#e5e7eb] bg-white px-6 py-4">
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[#57606a] hover:text-black transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
