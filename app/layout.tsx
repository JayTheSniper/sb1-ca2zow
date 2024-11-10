import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Schoolsat - Community School Reviews',
    template: '%s | Schoolsat'
  },
  description: 'Discover and review schools in your community. Find educational resources, courses, and connect with other students.',
  keywords: ['education', 'school reviews', 'courses', 'learning', 'community', 'students'],
  authors: [{ name: 'Schoolsat Team' }],
  creator: 'Schoolsat',
  publisher: 'Schoolsat',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#5E17EB',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://schoolsat.com',
    title: 'Schoolsat - Community School Reviews',
    description: 'Discover and review schools in your community',
    siteName: 'Schoolsat',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schoolsat - Community School Reviews',
    description: 'Discover and review schools in your community',
    creator: '@schoolsat',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="schoolsat-theme"
        >
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}