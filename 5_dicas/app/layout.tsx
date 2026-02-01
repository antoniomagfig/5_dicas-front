import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import { AuthProvider } from "@/context/AuthContext";
import BackButton from "@/components/BackButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jogo das 5 Dicas",
    template: "%s | Jogo das 5 Dicas",
  },
  description: "Jogue o Jogo das 5 Dicas e desafie seus amigos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          <GameProvider>
            {/* ⬅ BOTÃO VOLTAR GLOBAL */}
            <BackButton />
            {children}
          </GameProvider>
        </AuthProvider>
      </body>
    </html>
  );
}