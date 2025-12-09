import type { Metadata } from "next";
import { Fira_Sans_Condensed, Outfit } from "next/font/google";
import "./globals.css";

import Providers from "./providers";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "../components/Navbar";


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
            <div className="px-2 pt-[100px] sm:px-[5%] md:px-[10%] min-h-screen font-outfit bg-background text-primary">
              <div className="max-w-[1400px] mx-auto">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
