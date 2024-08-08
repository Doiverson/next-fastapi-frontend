'use client';
import React, { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

function subscribe(callback: () => void) {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);

    return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
    };
}

function getSnapshot() {
    return window.navigator.onLine;
}

function Navbar({ className }: { className?: string }) {
    const { setTheme, resolvedTheme } = useTheme();

    const onChangeDarkMode = (checked: boolean) => {
        if (checked) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    const isOnline = useSyncExternalStore(subscribe, getSnapshot);

    return (
        <div
            className={cn(
                'fixed inset-x-0 top-0 z-50 mx-auto flex h-12 w-full items-center justify-end bg-teal-900 px-4',
                className
            )}
        >
            <span className="mr-4">{isOnline ? 'Online' : 'Offline'}</span>
            <Switch id="airplane-mode" onCheckedChange={onChangeDarkMode} />
        </div>
    );
}

export default Navbar;
