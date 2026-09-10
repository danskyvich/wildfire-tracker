import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Wildfire Tracker",
  description: "A wildfire tracker web application that tracks wildfires across the world.",
  authors: [
    { name: "Danilo C. Pelin Jr.", url: `https://danppelin.vercel.app`},
  ],
};

export const viewport: Viewport = {
  colorScheme: 'dark'
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
