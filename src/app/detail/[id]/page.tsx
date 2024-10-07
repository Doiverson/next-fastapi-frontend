'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { string, z } from 'zod';

// components
import Spinner from '@/components/spinner';
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { FileUpload } from '@/components/ui/file-upload';
import Skeleton from '@/components/Skeleton';

interface DetailData {
    id: string;
    title: string;
    description: string;
}

const FormSchema = z.object({
    file: z.any(),
});

const Detail: React.FC = () => {
    const pathname = usePathname();
    const detail_id = pathname.split('/').pop();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            file: '',
        },
    });

    const fileRef = form.register('file');

    const { data, error, isLoading } = useSWR<DetailData>(
        `/api/details/${detail_id}`,
        async (url: string) => {
            const response = await fetch(url);
            return response.json();
        }
    );

    const hadnleFileUpload = async (stagedFile: File[]) => {
        console.log(stagedFile);
        // const formData = new FormData();
        // formData.append('file', stagedFile.file[0]);
        // console.log(formData.get('file'));

        // fetch('/api/upload', {
        //     method: 'POST',
        //     body: formData,
        // });

        // const data = await res.json();

        // we will return the uploaded image URL from the API to the client
        // console.log(data.imgUrl);
    };

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <Spinner />;
    if (!data) return <div>No Data</div>;

    const items = [
        {
            title: data.title,
            description: data.description,
            className: 'md:col-span-2',
        },
        {
            title: 'Tags',
            description: 'List of tags',
            header: <Skeleton />,
        },
    ];

    return (
        <div className="relative h-full w-full p-8">
            <div>
                <BentoGrid className="mx-auto max-w-4xl">
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            className={item.className}
                        />
                    ))}
                </BentoGrid>
            </div>
            <div className="mx-auto mt-4 min-h-60 w-full max-w-4xl rounded-lg border border-dashed border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
                <FileUpload onChange={hadnleFileUpload} />
            </div>
            {/* <Form {...form}>
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
            </Form> */}
        </div>
    );
};

export default Detail;
