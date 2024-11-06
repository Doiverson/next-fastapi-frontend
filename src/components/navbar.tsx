'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

// Utils
import { cn } from '@/lib/utils';

// Components
import { Switch } from '@/components/ui/switch';
import LoginButton from './LoginButton';

function Navbar({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [isOnline, setIsOnline] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
        'fixed inset-x-0 top-0 z-50 mx-auto flex h-12 w-full items-center justify-end bg-teal-900 px-4',
        className
      )}
    >
      <span className='mr-4'>{isOnline ? 'Online' : 'Offline'}</span>
      <Switch id='airplane-mode' onCheckedChange={onChangeDarkMode} />
      <LoginButton />
    </div>
  );
}

export default Navbar;
