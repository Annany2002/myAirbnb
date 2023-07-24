'use client';

import { useEffect, useState } from 'react';

interface ClientOnly {
    children: React.ReactNode;
}

export default function ClientOnly({ children }: ClientOnly) {
    const [hasMounted, setHasMounted] = useState<Boolean>(false);
    useEffect(() => {
        setHasMounted(true)
    }, [])
    if (!hasMounted) {
        return null;
    }
    return (
        <>
            {children}
        </>
    )
}