import { useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

import useErrorStore from './store/errorStore';

const GlobalErrorHandler = () => {
  const { error, clearError } = useErrorStore();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError(); // Clear the error after 2 seconds
      }, 2000);

      return () => {
        clearTimeout(timer);
      }; // Clean up the timer
    }
  }, [error, clearError]);

  // Animation configurations
  const variants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  };

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          animate="visible"
          className="fixed right-4 top-16 z-50 w-96 rounded-lg bg-destructive/95 p-4 text-destructive-foreground shadow-md"
          exit="exit"
          initial="hidden"
          transition={{ duration: 0.3 }}
          variants={variants}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <h2 className="font-semibold">Error!</h2>
          </div>
          <div className="mt-2 text-sm text-secondary">{error}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalErrorHandler;
