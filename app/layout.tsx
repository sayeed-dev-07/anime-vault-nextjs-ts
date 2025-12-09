import React from "react";
import type { Metadata } from "next";
import { Fira_Sans_Condensed, Outfit } from "next/font/google";
import "./globals.css";

import Providers from "./providers";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "../components/Navbar";
import { BreadcrumbSync } from "@/components/BreadCramp";
import SideBar from "@/components/SideBar";


const firaSans = Fira_Sans_Condensed({
  variable: "--font-fira-sans-cond",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
const OutfitFont = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "AniSearch",
  description: "Discover detailed information about your favorite anime and manga. Search by title, genre, release year, characters, or studios and explore ratings, summaries, reviews, trailers, episodes, and more. Your one-stop platform for discovering new anime, tracking what you watch, and learning about the latest releases",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaSans.variable} ${OutfitFont.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Navbar />

            <div className="pt-[90px] sm:pt-[110px] lg:grid lg:grid-cols-[1fr_4fr]">
              <div className="hidden  sticky top-[90px] sm:top-[110px] h-[calc(100vh-90px)] sm:h-[calc(100vh-110px)] overflow-hidden mx-1 lg:block border-r">
                <SideBar />
              </div>
              <div className="px-2 md:px-[2%] min-h-screen font-outfit bg-background text-primary">
                <div className="">
                  <BreadcrumbSync />
                  {children}
                </div>
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}