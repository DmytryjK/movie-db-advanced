import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface Options {
    threshold: number;
    root: Element;
    rootMargin: string;
    onIntersect: () => void;
}

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

export const useIntersectionObserver = (
    options: Partial<Options> = {},
): HookReturnType => {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();
    const {
        threshold = 1,
        root = null,
        rootMargin = '0px',
        onIntersect,
    } = options;
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    onIntersect?.();
                }
                setEntry(entry);
            },
            {
                threshold,
                root,
                rootMargin,
            },
        );
        const currentRef = targetRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => currentRef ?? observer.disconnect();
    }, [onIntersect, root, rootMargin, threshold]);

    return [targetRef, entry];
};
