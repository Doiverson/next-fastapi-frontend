'use client';
import React, { useState } from 'react';

// libraries
import { set, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useSwr, { mutate } from 'swr';
import { useRouter } from 'next/navigation';

// components
import Card from '@/components/Card';
import Dialog from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Spinner from '@/components/spinner';

const FormSchema = z.object({
    title: z.string(),
    content: z.string(),
});

interface Post {
    id: string;
    title: string;
    content: string;
}

const Main: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    const { toast } = useToast();
    const router = useRouter();

    const fetchData = async (url: string) => {
        const response = await fetch(`${url}`);
        return response.json();
    };

    const { data, error, isLoading } = useSwr<Post[]>('api/posts', fetchData);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            content: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const res = await fetch('api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            mutate('api/posts');
            toast({
                title: 'Post submitted successfully!',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {JSON.stringify(data, null, 2)}
                        </code>
                    </pre>
                ),
            });
            form.reset();
        } else {
            console.error('Failed to submit post:', res.status);
        }
    };

    const handleDeletePost = async () => {
        await fetch(`/api/posts/${postToDelete}`, {
            method: 'DELETE',
        });
        mutate('api/posts');
        setIsOpen(false);
        setPostToDelete(null);
        toast({
            title: 'Post deleted successfully!',
            description: 'Your post has been deleted.',
        });
    };

    const handleClickDelete = (id: string) => {
        setIsOpen(true);
        setPostToDelete(id);
    };

    const handleClickCancel = () => {
        setIsOpen(false);
        setPostToDelete(null);
    };

    const handleClickDetail = (id: string) => {
        router.push(`/detail/${id}`);
    };

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <Spinner />;

    return (
        <div className="relative h-full w-full p-8">
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
            <div className="grid min-w-[850px] grid-cols-3 gap-4">
                {data?.map((post, index) => (
                    <Card
                        id={post.id}
                        key={index}
                        title={post.title}
                        content={post.content}
                        handleDelete={handleClickDelete}
                        handleClickDetail={handleClickDetail}
                    />
                ))}
            </div>
            <Dialog
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your post."
                isOpen={isOpen}
                buttonCancel="Cancel"
                buttonOk="Delete"
                handleClickCancel={handleClickCancel}
                handleDeletePost={handleDeletePost}
            />
        </div>
    );
};

export default Main;
