import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Connect } from "@/source/components/connect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Food Wars",
  description: "Ether tip competition for restaurants",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center">
          <div className="z-10 w-full max-w-5xl items-center font-mono text-center m-2">
            <Connect />
            <div>
              <h1 className="text-6xl font-extrabold mb-4 text-brown-500 bg-brown-500 p-2 rounded-lg tracking-widest font-mono text-shadow-lg shadow-amber-800">
                FOODWARS
              </h1>
            </div>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
                