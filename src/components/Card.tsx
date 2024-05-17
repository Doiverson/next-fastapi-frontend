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
    footer?: string;
    className?: string;
    onClick: (id: string) => void;
};

const Card = (props: Props) => {
    const { id, className, title, content, descriotion, footer, onClick } =
        props;

    const handleOnClick = (id: string) => {
        onClick(id);
    };

    return (
        <ShadCard key={id} className={cn('relative w-64', className)}>
            <Button
                onClick={() => handleOnClick(id)}
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
            {footer && (
                <CardFooter>
                    <p>{footer}</p>
                </CardFooter>
            )}
        </ShadCard>
    );
};

export default Card;
