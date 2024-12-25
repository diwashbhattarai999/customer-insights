import { Outlet, useLocation } from 'react-router';

import GlobalErrorHandler from '@/app/GlobalErrorHandler';

import Navbar from '../navbar';
import Sidebar from '../sidebar';

export default function MainLayout() {
  const { pathname } = useLocation();

  // Paths where the Layout should not be applied
  const noLayoutPaths = ['/login', '/403', '/500', '/404'];

  // Check if the current path is in the noLayoutPaths
  if (noLayoutPaths.includes(pathname)) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return (
    <div className="container flex h-screen">
      <Sidebar />
      <main className="h-full flex-1 overflow-y-auto bg-background">
        <Navbar />
        <div className="px-4 py-5 md:px-10">
          <Outlet />
        </div>
      </main>
      <GlobalErrorHandler />
    </div>
  );
}
