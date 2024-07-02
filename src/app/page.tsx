'use client';
import React, { useEffect, useState } from 'react';

import { set, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useSwr, { mutate } from 'swr';

import Card from '@/components/Card';
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

import { AuroraBackground } from '@/components/ui/aurora-background';

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
    const [posts, setPosts] = useState<Post[]>([]);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            content: '',
        },
    });

    const fetchData = async (url: string) => {
        const response = await fetch(`${url}`);
        const data = await response.json();
        setPosts(data);
    };

    const { data, error } = useSwr('api/posts', fetchData);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const res = await fetch('api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
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
        } else {
            console.error('Failed to submit post:', res.status);
        }
    };

    const handleDeletePost = async (id: string) => {
        await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        mutate('api/posts');
    };

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <AuroraBackground>
            <div className="relative h-full p-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-2/3 space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="dark:text-white">
                                            Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="dark:text-white"
                                                {...field}
                                            />
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
                                        <FormLabel className="dark:text-white">
                                            Content
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="resize-none dark:text-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
                <div className="flex flex-row flex-wrap justify-between">
                    {posts.map((post, index) => (
                        <Card
                            id={post.id}
                            key={index}
                            title={post.title}
                            content={post.content}
                            onClick={handleDeletePost}
                        />
                    ))}
                </div>
            </div>
        </AuroraBackground>
    );
};

export default Main;
