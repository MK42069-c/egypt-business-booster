import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import GlobalProviders from '@/components/GlobalProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Egypt Business Booster - AI-Powered Digital Agency Platform",
  description: "Comprehensive digital marketing platform for Egyptian SMEs with AI-powered website building, social media content creation, and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}