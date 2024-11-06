'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useClientSession from '@/lib/clientSession';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useSwr, { mutate } from 'swr';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

import Card from '@/components/Card';
import Dialog from '@/components/Dialog';
import Spinner from '@/components/spinner';

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
});

interface Post {
  id: string;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  useClientSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  const fetchData = async (url: string) => {
    const response = await fetch(`${url}`);
    return response.json();
  };

  const { data, error, isLoading } = useSwr<Post[]>('api/posts', fetchData);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const res = await fetch('api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        detail: {
          tags: 'Detail description for the new post',
        },
      }),
    });

    if (res.ok) {
      mutate('api/posts');
      toast({
        title: 'Post submitted successfully!',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
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

  if (isLoading) return <Spinner />;

  return (
    <div className='relative h-full w-full p-8'>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6'
          >
            <FormField
              control={form.control}
              name='title'
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
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
      <div className='grid min-w-[850px] grid-cols-3 gap-4'>
        {data?.map((post, index) => (
          <Card
            id={post.id}
            key={index}
            title={post.title}
            content={post.description}
            handleDelete={handleClickDelete}
            handleClickDetail={handleClickDetail}
          />
        ))}
      </div>
      <Dialog
        title='Are you absolutely sure?'
        description='This action cannot be undone. This will permanently delete your post.'
        isOpen={isOpen}
        buttonCancel='Cancel'
        buttonOk='Delete'
        handleClickCancel={handleClickCancel}
        handleDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default Home;
