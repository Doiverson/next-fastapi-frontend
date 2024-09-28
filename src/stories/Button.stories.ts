import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button, ButtonProps } from '../components/ui/button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'default',
                'destructive',
                'outline',
                'secondary',
                'ghost',
                'link',
            ],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon'],
        },
    },
    args: {
        onClick: fn(),
        asChild: false,
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default',
        size: 'default',
        children: 'Default Button',
    },
};

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        size: 'default',
        children: 'Destructive Button',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        size: 'default',
        children: 'Outline Button',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        size: 'default',
        children: 'Secondary Button',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        size: 'default',
        children: 'Ghost Button',
    },
};

export const Link: Story = {
    args: {
        variant: 'link',
        size: 'default',
        children: 'Link Button',
    },
};
