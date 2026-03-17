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
      <body className="bg-bg-canvas text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
