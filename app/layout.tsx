import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const minecraftTitle = localFont({
  src: "../public/fonts/MinecraftFontTitle.ttf",
  variable: "--font-minecraft-title",
  display: "swap",
});

const minecraftRegular = localFont({
  src: "../public/fonts/MinecraftFontRegular.ttf",
  variable: "--font-minecraft-regular",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tobi's Portfolio - Minecraft Themed",
  description: "A Minecraft-themed developer portfolio showcasing projects, skills, and experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${minecraftTitle.variable} ${minecraftRegular.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
