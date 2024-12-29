import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

type Props = React.ComponentProps<'div'> & {
  children: React.ReactNode;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  rootMargin?: `${number}%` | `${number}px`;
};

export function InfiniteScrollObserver(props: Props) {
  const {
    children,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    rootMargin = '20%',
    ...restProps
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const intersectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!intersectionRef.current || !containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        if (!hasNextPage) {
          observerInstance.disconnect();
          return;
        }

        const { isIntersecting } = entries[0];

        if (isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: containerRef.current,
        rootMargin,
      }
    );

    observer.observe(intersectionRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div {...restProps} ref={containerRef}>
      {children}

      <div
        ref={intersectionRef}
        className={cn(
          isFetchingNextPage && 'text-blue-500 w-full flex justify-center py-4'
        )}
      >
        {isFetchingNextPage && (
          <div>
            <Loader2Icon className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
