'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

function Navbar({ className }: { className?: string }) {
    const { setTheme, resolvedTheme } = useTheme();

    const onChangeDarkMode = (checked: boolean) => {
        if (checked) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return (
        <div
            className={cn(
                'fixed inset-x-0 top-0 z-50 mx-auto flex h-12 w-full items-center justify-end px-4',
                className
            )}
        >
            <Switch id="airplane-mode" onCheckedChange={onChangeDarkMode} />
        </div>
    );
}

export default Navbar;
