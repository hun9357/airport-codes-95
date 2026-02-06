import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airport Codes Database - Find IATA & ICAO Codes Worldwide',
  description: 'Comprehensive database of airport codes. Search and browse IATA and ICAO codes for 200+ major airports worldwide. Get location, timezone, and contact information.',
  keywords: 'airport codes, IATA codes, ICAO codes, airport database, flight information',
  openGraph: {
    title: 'Airport Codes Database - Find IATA & ICAO Codes Worldwide',
    description: 'Comprehensive database of airport codes for 200+ major airports.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b-2 border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <a href="/" className="text-2xl font-bold text-primary hover:text-blue-700 transition-colors">
                Airport Codes
              </a>
            </div>
          </header>

          <main className="flex-grow">
            {children}
          </main>

          <footer className="bg-white border-t-2 border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600 text-sm">
                <p className="mb-2">
                  © {new Date().getFullYear()} Airport Codes Database. All rights reserved.
                </p>
                <p className="text-xs text-gray-500">
                  Information provided for reference purposes only. Always verify with official sources.
                </p>
              </div>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
