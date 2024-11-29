import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import {
  Theme as ThemeProvider,
  Auth as AuthProvider,
} from '@/contexts/providers';
import { cn } from '@/lib/utils';

import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { SidebarMenu } from '@/components/SidebarMenu';

export const metadata: Metadata = {
  title: 'Shit App',
  description: "I'm doing shit",
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script src='https://unpkg.com/react-scan/dist/auto.global.js' async/>
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <SidebarMenu className='pt-12'>
              <AuroraBackground className='dark: z-1 text-dark-theme'>
                {children}
              </AuroraBackground>
            </SidebarMenu>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
