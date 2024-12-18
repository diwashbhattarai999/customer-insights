import { useLocation } from 'react-router';

import { Toaster } from 'sonner';

import GlobalErrorHandler from '@/GlobalErrorHandler';

import Navbar from './components/navbar';
import Sidebar from './components/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  // Paths where the Layout should not be applied
  const noLayoutPaths = ['/login', '/403', '/500', '/404'];

  if (noLayoutPaths.includes(location.pathname)) {
    return (
      <>
        {children}
        <Toaster richColors position="top-center" />
      </>
    );
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="h-full flex-1 overflow-y-auto bg-background">
        <Navbar />
        <div className="px-10 py-5">{children}</div>
      </main>
      <Toaster richColors position="top-center" />
      <GlobalErrorHandler />
    </div>
  );
}
