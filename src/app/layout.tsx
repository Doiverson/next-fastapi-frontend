import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import { Providers } from '@/contexts/providers';
import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { AuroraBackground } from '@/components/ui/aurora-background';

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
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <Providers
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuroraBackground>
                        <Navbar />
                        {children}
                        <Toaster />
                    </AuroraBackground>
                </Providers>
            </body>
        </html>
    );
}
