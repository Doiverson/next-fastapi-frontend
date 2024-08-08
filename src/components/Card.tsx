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
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { Button } from './ui/button';
import { CldImage } from 'next-cloudinary';

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
        <CardContainer className="inter-var w-full">
            <CardBody className="group/card relative h-auto  w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem]">
                <div className="flex items-center justify-end">
                    <CardItem translateZ={20}>
                        <Button onClick={() => handleDelete(id)}>X</Button>
                    </CardItem>
                </div>
                <CardItem translateZ="100" className="mt-4 w-full">
                    <CldImage
                        width="600"
                        height="600"
                        src="shit_app/ynp3stq7c66j9upnzgi9"
                        alt="post image"
                    />
                </CardItem>
                <div className="mt-4 flex items-center justify-center">
                    <CardItem translateZ={20}>
                        <Button
                            onClick={() => handleClickDetail(id)}
                            className="w-full"
                        >
                            Detail
                        </Button>
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
        // <ShadCard key={id} className={cn('relative w-full', className)}>
        //     <Button
        //         onClick={() => handleDelete(id)}
        //         className="absolute right-2 top-2"
        //     >
        //         X
        //     </Button>
        //     <CardHeader>
        //         <CardTitle>{title}</CardTitle>
        //         {descriotion && (
        //             <CardDescription>{descriotion}</CardDescription>
        //         )}
        //     </CardHeader>
        //     <CardContent>
        //         <CldImage
        //             width="600"
        //             height="600"
        //             src="shit_app/ynp3stq7c66j9upnzgi9"
        //             alt="post image"
        //         />
        //         <p>{content}</p>
        //     </CardContent>
        //     <CardFooter>
        //         <Button
        //             onClick={() => handleClickDetail(id)}
        //             className="w-full"
        //         >
        //             Detail
        //         </Button>
        //     </CardFooter>
        // </ShadCard>
    );
};

export default Card;
