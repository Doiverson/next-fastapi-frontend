'use client';
import React from 'react';
import { v2 as cloudinary } from 'cloudinary';
import { usePathname } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import Spinner from '@/components/spinner';
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const FormSchema = z.object({
    file: z.any(),
});

const Detail = () => {
    const pathname = usePathname();
    const detail_id = pathname.split('/').pop();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            file: '',
        },
    });

    const fileRef = form.register('file');
    console.log(fileRef);

    const { data, error, isLoading } = useSWR(
        `/api/details/${detail_id}`,
        async (url: string) => {
            const response = await fetch(url);
            return response.json();
        }
    );

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data);
        const formData = new FormData();
        formData.append('image', data.file[0]);
        const file = formData.get('image') as File;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // await new Promise((resolve, reject) => {
        //     cloudinary.uploader
        //         .upload_stream(
        //             {
        //                 tags: ['nextjs-server-actions-upload-sneakers'],
        //                 upload_preset: 'nextjs-server-actions-upload',
        //             },
        //             function (error, result) {
        //                 if (error) {
        //                     reject(error);
        //                     return;
        //                 }
        //                 resolve(result);
        //             }
        //         )
        //         .end(buffer);
        // });
    };

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <Spinner />;

    return (
        <div className="relative h-full w-full p-8">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6"
                >
                    <FormField
                        name="file"
                        control={form.control}
                        render={() => (
                            <FormItem>
                                <FormLabel htmlFor="image">Image</FormLabel>
                                <FormControl>
                                    <Input type="file" {...fileRef} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default Detail;
