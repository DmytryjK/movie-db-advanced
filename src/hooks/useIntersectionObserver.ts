import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface Options {
    threshold: number;
    root: Element;
    rootMargin: string;
}

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

export const useIntersectionObserver = (
    options: Partial<Options> = {},
): HookReturnType => {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();
    const { threshold = 1, root = null, rootMargin = '0px' } = options;
    const targetRef = useRef(null);

    const callbackFn = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        setEntry(entry);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFn, {
            threshold,
            root,
            rootMargin,
        });
        const currentRef = targetRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => currentRef ?? observer.disconnect();
    }, []);

    return [targetRef, entry];
};
