import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Navbar } from "@/components/Navbar";
import { WalletProvider } from "@/contexts/WalletContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stellar Tip Jar",
  description: "Tip your favorite creators with Stellar assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <WebSocketProvider>
            <div className="min-h-screen">
              <Navbar />
              <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>
            </div>
          </WebSocketProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
