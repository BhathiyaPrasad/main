"use client"; // Mark this as a client component

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // Initialize on client

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
