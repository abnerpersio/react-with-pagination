import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { WithPagination } from '../services/types';

type FilterWithPagination<TFilters> = TFilters & {
  page: number;
};

type QueryOptions<TData> = Omit<
  UseQueryOptions<WithPagination<TData>>,
  'queryKey' | 'queryFn'
>;

type Options<TData, TFilters extends Record<string, unknown>> = Partial<
  QueryOptions<TData>
> & {
  fetcher: (
    filters: FilterWithPagination<TFilters>
  ) => Promise<WithPagination<TData>>;
  queryKey: string[];
  filters?: TFilters;
  perPage: number;
};

export function usePaginatedQuery<
  TData,
  TFilters extends Record<string, unknown>
>(options: Options<TData, TFilters>) {
  const {
    fetcher,
    queryKey,
    perPage,
    filters: initialFilters,
    ...restOptions
  } = options;

  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialPage = parseInt(searchParams.get('page') ?? '1');
    return initialPage;
  });

  const filters = { ...initialFilters, page: currentPage };

  const { data, isLoading, ...query } = useQuery({
    queryKey: [...queryKey, filters],
    queryFn: () => fetcher(filters as FilterWithPagination<TFilters>),
    staleTime: Infinity,
    ...restOptions,
  });

  const totalPages = Math.ceil((data?.items ?? 0) / perPage);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const handleNextPage = useCallback(() => {
    setCurrentPage((prevState) => prevState + 1);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prevState) => (prevState > 1 ? prevState - 1 : prevState));
  }, []);

  const handleSelectPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', currentPage.toString());
    window.history.replaceState({}, '', url);
  }, [currentPage]);

  return {
    data,
    isLoading,
    ...query,
    pagination: {
      currentPage,
      totalPages,
      hasPrevPage,
      hasNextPage,
      handleNextPage,
      handlePrevPage,
      handleSelectPage,
    },
  };
}
