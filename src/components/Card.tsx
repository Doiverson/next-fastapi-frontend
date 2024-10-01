import React from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { Button } from './ui/button';
import { CldImage } from 'next-cloudinary';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

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
                <CardItem translateZ={20} className="absolute right-6 top-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVerticalIcon className="size-6" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleDelete(id)}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardItem>

                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    {title}
                </CardItem>
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
    );
};

export default Card;
