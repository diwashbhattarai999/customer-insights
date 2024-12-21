import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

import Forbidden from '@/403';
import ErrorPage from '@/500';
import { ThemeProvider } from '@/components/theme-provider';
import Layout from '@/Layout';
import Dashboard from '@/page/dashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CustomerDetails from './page/customer/customer-details';
import NotFound from './404';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="customer-insights-theme">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Layout>
              <Routes>
                <Route element={<Dashboard />} path="/" />
                <Route element={<CustomerDetails />} path="/customers/:id" />

                {/* Error Pages */}
                <Route element={<Forbidden />} path="/403" />
                <Route element={<ErrorPage />} path="/500" />

                {/* Not Found Route - Redirect to /404 page */}
                <Route element={<NotFound />} path="*" />
              </Routes>
            </Layout>
          </Router>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
