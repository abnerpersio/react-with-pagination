import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Clients } from './components/Clients';
import { queryClient } from './lib/queryClient';

export function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container py-10">
        <Clients />
      </div>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
