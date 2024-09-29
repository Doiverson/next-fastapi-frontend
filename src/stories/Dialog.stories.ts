import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Dialog from '@/components/Dialog';

const meta = {
    title: 'UI/Dialog',
    component: Dialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
        isOpen: { control: 'boolean' },
        buttonCancel: { control: 'text' },
        buttonOk: { control: 'text' },
        handleClickCancel: { action: 'clicked' },
        handleDeletePost: { action: 'clicked' },
    },
    args: {
        title: 'Are you absolutely sure?',
        description:
            'This action cannot be undone. This will permanently delete your post.',
        isOpen: true,
        buttonCancel: 'Cancel',
        buttonOk: 'OK',
        handleClickCancel: fn(),
        handleDeletePost: fn(),
    },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
