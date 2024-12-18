import Layout from "@/Layout";
import Dashboard from "@/page/dashboard";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import Forbidden from "@/403";
import ErrorPage from "@/500";
import NotFound from "./404";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="customer-insights-theme">
      <HelmetProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/403" element={<Forbidden />} />
              <Route path="/500" element={<ErrorPage />} />

              {/* Not Found Route - Redirect to /404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
