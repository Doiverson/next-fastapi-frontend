'use client';
import React from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AuroraBackground } from '@/components/ui/aurora-background';

const Main: React.FC = () => {
    return (
        <AuroraBackground>
            <Card className="w-64">
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </AuroraBackground>
    );
};

export default Main;
