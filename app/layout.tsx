import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading"
});
const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "IT Terms Atlas",
  description: "Pastel blue IT glossary with AI-assisted summaries."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--ink-900)"
        }}
      >
        <NavBar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
