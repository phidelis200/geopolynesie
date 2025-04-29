import { Toaster } from '@/components/ui/sonner';
import { initAOS } from '@/utils/aos';
import React, { useEffect } from 'react';

const Provider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    useEffect(() => {
        initAOS();
    }, []);
    return (
        <>
            {children}
            <Toaster position="top-right" richColors />
        </>
    );
};

export default Provider;
