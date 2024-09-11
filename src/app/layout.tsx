import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./(component)/_header/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Search",
  description: "Musician and Album Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
