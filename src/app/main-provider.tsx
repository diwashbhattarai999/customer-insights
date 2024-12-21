import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { Toaster } from 'sonner';

import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const MainProvider = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="customer-insights-theme">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          {children}

          <Toaster richColors position="top-center" />

          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default MainProvider;
