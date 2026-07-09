import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AIAssistant } from "@/components/AIAssistant";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "E-Traders By ELECTRON | Plateforme de Trading Intelligent",
  description: "Plateforme SaaS de trading intelligente combinant apprentissage interactif, analyse de marché avancée, génération de signaux intelligents et automatisation du trading.",
  keywords: ["trading", "forex", "crypto", "actions", "algorithmic trading", "AI", "intelligent trading"],
  authors: [{ name: "ELECTRON" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFD700",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans bg-dark-bg text-white antialiased`}>
        <Providers>
          {children}
          <AIAssistant />
        </Providers>
      </body>
    </html>
  );
}