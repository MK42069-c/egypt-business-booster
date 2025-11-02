'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Egypt Business Booster - AI-Powered Digital Agency Platform",
  description: "Comprehensive digital marketing platform for Egyptian SMEs with AI-powered website building, social media content creation, and more",
};

function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <GlobalProviders>
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}