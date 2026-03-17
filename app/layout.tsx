import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import ChatBot from "./components/ChatBot";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "YLY — AI Development Environment",
  description: "YLY to środowisko rozwoju AI stworzone przez Patryka Olejnika. Kursy, e-booki, prompty i ekskluzywna społeczność.",
  keywords: "AI, sztuczna inteligencja, kursy AI, prompt engineering, YLY, Patryk Olejnik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} antialiased`}>
        <LanguageProvider>
          {children}
          <ChatBot />
        </LanguageProvider>
      </body>
    </html>
  );
}
