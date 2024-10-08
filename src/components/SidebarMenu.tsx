'use client';
import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar';
import { IconArrowLeft, IconHome, IconBoltFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SidebarMenuProps {
    children?: React.ReactNode;
    className?: string;
}

export function SidebarMenu({ children, className }: SidebarMenuProps) {
    const links = [
        {
            label: 'Dashboard',
            href: '/',
            icon: (
                <IconHome className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
            ),
        },
        {
            label: 'Logout',
            href: '#',
            icon: (
                <IconArrowLeft className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                'mx-auto flex h-screen w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 md:flex-row',
                className
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className='justify-between gap-10'>
                    <div className='flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                        {open ? <Logo /> : <LogoIcon />}
                        <div className='mt-8 flex flex-col gap-2'>
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
            {children}
        </div>
    );
}
export const Logo = () => {
    return (
        <LogoIcon>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='whitespace-pre font-medium text-black dark:text-white'
            >
                Noob Dev
            </motion.span>
        </LogoIcon>
    );
};
export const LogoIcon: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    return (
        <Link
            href='/'
            className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'
        >
            <IconBoltFilled color='#ffbf00' className='flex-shrink-0' />
            {children}
        </Link>
    );
};
