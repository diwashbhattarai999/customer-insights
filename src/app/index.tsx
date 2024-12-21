// import { HelmetProvider } from 'react-helmet-async';
// import { BrowserRouter as Router, Route, Routes } from 'react-router';

// import Forbidden from '@/app/403';
// import ErrorPage from '@/app/500';
// import Layout from '@/app/Layout';
// import { ThemeProvider } from '@/components/theme-provider';
// import Dashboard from '@/page/dashboard';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import ScrollToTop from '../components/ScrollToTop';
// import CustomerDetails from '../page/customer/customer-details';

// import NotFound from './404';
// // import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <ThemeProvider defaultTheme="light" storageKey="customer-insights-theme">
//       <HelmetProvider>
//         <QueryClientProvider client={queryClient}>
//

//           {/* <ReactQueryDevtools initialIsOpen={false} /> */}
//         </QueryClientProvider>
//       </HelmetProvider>
//     </ThemeProvider>
//   );
// }

// export default App;

import { Outlet } from 'react-router';

import ScrollToTop from '@/components/ScrollToTop';

import MainProvider from './main-provider';

/**
 * App component is the entry point for the application.
 */
const App = () => {
  return (
    <MainProvider>
      <Outlet />

      <ScrollToTop />
    </MainProvider>
  );
};

export default App;
