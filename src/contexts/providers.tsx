'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { SessionProvider } from 'next-auth/react';

export function Theme({ children, ...props }: ThemeProviderProps) {
    return <ThemeProvider {...props}>{children}</ThemeProvider>;
}

export function Auth({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
