import React from 'react';
import { cn } from '@/lib/utils';
import {
    Card as ShadCard,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';

type Props = {
    id: string;
    title: string;
    content: string;
    descriotion?: string;
    className?: string;
    handleDelete: (id: string) => void;
    handleClickDetail: (id: string) => void;
};

const Card = (props: Props) => {
    const {
        id,
        className,
        title,
        content,
        descriotion,
        handleDelete,
        handleClickDetail,
    } = props;

    return (
        <ShadCard key={id} className={cn('relative w-full', className)}>
            <Button
                onClick={() => handleDelete(id)}
                className="absolute right-2 top-2"
            >
                X
            </Button>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {descriotion && (
                    <CardDescription>{descriotion}</CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => handleClickDetail(id)}
                    className="w-full"
                >
                    Detail
                </Button>
            </CardFooter>
        </ShadCard>
    );
};

export default Card;
