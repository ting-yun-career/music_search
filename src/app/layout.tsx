import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "material-symbols";
import classNames from "classnames";
import "./globals.css";

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
      <body className={classNames(inter.className, "antialiased")}>
        {children}
      </body>
    </html>
  );
}
