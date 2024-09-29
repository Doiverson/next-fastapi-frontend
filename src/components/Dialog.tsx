import React from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface DialogProps {
    title: string;
    description: string;
    isOpen: boolean;
    buttonCancel: string;
    buttonOk: string;
    handleClickCancel: () => void;
    handleDeletePost: () => void;
}

const Dialog: React.FC<DialogProps> = ({
    title,
    description,
    isOpen,
    buttonCancel = 'Cancel',
    buttonOk = 'OK',
    handleClickCancel,
    handleDeletePost,
}) => {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleClickCancel}>
                        {buttonCancel}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeletePost}>
                        {buttonOk}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Dialog;
