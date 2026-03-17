import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitHub x Figma Mixer",
  description:
    "GitHub と Figma のコラボレーションイベント「GitHub x Figma Mixer」のイベントページです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-canvas text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
