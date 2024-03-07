import { ClientsService } from '@/services/ClientsService';
import { useQuery } from '@tanstack/react-query';

export function useClients() {
  const { data, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: ClientsService.getAll,
  });

  return {
    clients: data ?? [],
    isLoading,
  };
}
