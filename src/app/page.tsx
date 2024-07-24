'use client';
import React from 'react';

import { set, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useSwr, { mutate } from 'swr';
import { useRouter } from 'next/navigation';

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
        } else {
            console.error('Failed to submit post:', res.status);
        }
    };

    const handleDeletePost = async (id: string) => {
        await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });
        mutate('api/posts');
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
            <div className="grid min-w-[850px] grid-cols-3 gap-4">
                {data?.map((post, index) => (
                    <Card
                        id={post.id}
                        key={index}
                        title={post.title}
                        content={post.content}
                        handleDelete={handleDeletePost}
                        handleClickDetail={handleClickDetail}
                    />
                ))}
            </div>
        </div>
    );
};

export default Main;
