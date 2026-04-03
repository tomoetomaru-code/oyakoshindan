import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "親子の個性診断 | 信頼関係を育む",
  description:
    "シュタイナー4気質・MI理論・ユング理論から、子どもと親の個性を診断。親子の信頼関係を育むためのアドバイスをお届けします。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-dot min-h-screen">{children}</body>
    </html>
  );
}
