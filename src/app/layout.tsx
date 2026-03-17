import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ChatBot from "./components/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub + Figma Mixer — Spring Merge: Where Code Meets Design",
  description:
    "コードとデザインが交わる春の夜、GitHubとFigmaが開催するネットワーキングイベントです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
