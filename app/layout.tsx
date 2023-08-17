import "./globals.css";
import { Inter } from "next/font/google";
import Web3 from "web3";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FoodWars",
  description: "Ultimate Crypto Foods Battle Royale",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
