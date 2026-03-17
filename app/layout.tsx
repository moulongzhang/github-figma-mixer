import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

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
    <html lang="ja" className={notoSansJP.variable}>
      <body className="bg-bg-canvas text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
