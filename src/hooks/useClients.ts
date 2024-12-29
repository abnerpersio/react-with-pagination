import { ClientsService } from '@/services/ClientsService';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { usePaginatedQuery } from './usePaginatedQuery';

export function useClients(perPage: number = 10) {
  const queryClient = useQueryClient();

  const { data, isLoading, pagination } = usePaginatedQuery({
    queryKey: ['clients'],
    fetcher: (filters) => ClientsService.getAll(filters.page, perPage),
    staleTime: Infinity,
    perPage,
  });

  useEffect(() => {
    if (!pagination.hasNextPage) {
      return;
    }

    const nextPage = pagination.currentPage + 1;

    queryClient.prefetchQuery({
      queryKey: ['clients', { page: nextPage }],
      queryFn: () => ClientsService.getAll(nextPage, perPage),
    });
  }, [pagination.currentPage, pagination.hasNextPage]);

  return {
    clients: data?.data ?? [],
    isLoading,
    pagination,
  };
}
