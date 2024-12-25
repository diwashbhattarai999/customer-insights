import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';

import App from '@/app';
import MainLayout from '@/components/layouts/main-layout';
import CustomerDetails from '@/features/customer/pages/customer-details';
import CustomerList from '@/features/customer/pages/customer-list';
import Dashboard from '@/features/dashboard';

import Forbidden from '../403';
import NotFound from '../404';
import ErrorPage from '../500';

/**
 * Router configuration for the application
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route element={<MainLayout />}>
        <Route element={<Dashboard />} path="/" />
        <Route element={<CustomerDetails />} path="/customers/:id" />
        <Route element={<CustomerList />} path="/customers" />

        {/* Error Pages */}
        <Route element={<Forbidden />} path="/403" />
        <Route element={<ErrorPage />} path="/500" />

        {/* Not Found Route - Redirect to /404 page */}
        <Route element={<NotFound />} path="*" />
      </Route>
    </Route>
  )
);

export { router };
