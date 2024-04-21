'use client';
import React, { MouseEventHandler, useState } from 'react';
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
                'fixed top-0 inset-x-0 w-full h-12 mx-auto px-4 z-50 flex items-center justify-end',
                className
            )}
        >
            <Switch id="airplane-mode" onCheckedChange={onChangeDarkMode} />
        </div>
    );
}

export default Navbar;
