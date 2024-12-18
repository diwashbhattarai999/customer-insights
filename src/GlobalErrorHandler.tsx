import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

import useErrorStore from "./store/errorStore";

const GlobalErrorHandler = () => {
  const { error, clearError } = useErrorStore();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError(); // Clear the error after 2 seconds
      }, 2000);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [error, clearError]);

  // Animation configurations
  const variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          className="fixed top-16 right-4 p-4 rounded-lg shadow-md z-50 w-96 bg-destructive/95 text-destructive-foreground"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <h2 className="font-semibold">Error!</h2>
          </div>
          <div className="text-secondary text-sm mt-2">{error}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalErrorHandler;
