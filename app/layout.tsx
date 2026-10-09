import React from "react";
import type { Metadata } from "next";
import { Fira_Sans_Condensed, Outfit } from "next/font/google";
import "./globals.css";

import Providers from "./providers";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "../components/Navbar";
import { BreadcrumbSync } from "@/components/BreadCramp";
import SideBar from "@/components/SideBar";
import BackButton from "@/components/BackButton";

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
  title: "AniSearch.",
  description: "Discover detailed information about your favorite anime and manga.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${firaSans.variable} ${OutfitFont.variable} antialiased selection:bg-[crimson] selection:text-white`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            {/* Adjusted grid to use a fixed sidebar width of 260px on large screens */}
            <div className="pt-[80px] sm:pt-[90px] xl:grid grid-cols-1 xl:grid-cols-[260px_1fr]">

              {/* 
                1. Added 'hidden xl:block' to hide this on mobile/tablet (MobileMenu takes over) 
                2. Changed 'xl:border-r' to 'xl:border-r-2' to match the brutalist Navbar border
              */}
              <aside className="hidden xl:block xl:pt-8 pt-2 xl:sticky top-[90px] xl:h-[calc(100vh-90px)] overflow-y-auto xl:border-r-2 border-border custom-scrollbar">
                <SideBar />
              </aside>

              <main className="px-4 md:px-8 min-h-screen font-outfit bg-background text-foreground">
                <div className="pt-4 max-w-[1600px] mx-auto">
                  <BreadcrumbSync />
                  {children}
                </div>
              </main>

            </div>

            <div className="fixed sm:bottom-10 bottom-6 right-4 sm:right-10 z-20">
              <BackButton />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}