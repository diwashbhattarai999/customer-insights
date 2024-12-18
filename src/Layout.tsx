import { useLocation } from "react-router";
import { Toaster } from "sonner";
import GlobalErrorHandler from "@/GlobalErrorHandler";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  // Paths where the Layout should not be applied
  const noLayoutPaths = ["/login", "/403", "/500", "/404"];

  if (noLayoutPaths.includes(location.pathname)) {
    return (
      <>
        {children}
        <Toaster position="top-center" richColors />
      </>
    );
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto bg-background">
        <Navbar />
        <div className="py-5 px-10">{children}</div>
      </main>
      <Toaster position="top-center" richColors />
      <GlobalErrorHandler />
    </div>
  );
}
