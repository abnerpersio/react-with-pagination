import { ClientsService } from '@/services/ClientsService';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useClients(perPage: number = 20) {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['clients'],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => ClientsService.getAll(pageParam, perPage),
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const totalPages = Math.ceil(lastPage.items / perPage);

        if (allPages.length >= totalPages) {
          return null;
        }

        return lastPageParam + 1;
      },
    });

  return {
    clients: data?.pages?.flatMap((pageData) => pageData?.data) ?? [],
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
