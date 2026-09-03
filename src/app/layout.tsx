import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VivaLang — AI Language Learning Platform',
  description: 'Learn a language by living it. Real-time AI conversation partner, data-driven curriculum, spaced repetition, personal notes, and immersive scenarios.',
  keywords: ['language learning', 'AI tutor', 'French', 'German', 'Spanish', 'Japanese', 'CEFR', 'spaced repetition'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} dark`}>
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white pb-20 lg:pb-0">
        <AppProvider>
          <Navbar />
          <div className="mx-auto flex max-w-7xl">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
              {children}
            </main>
          </div>
          <MobileNav />
        </AppProvider>
      </body>
    </html>
  );
}
