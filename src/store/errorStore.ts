import { create } from 'zustand';

type ErrorStore = {
  error: string | null;
  setError: (error: string | Error | null | undefined | { message: string }) => void;
  clearError: () => void;
};

const useErrorStore = create<ErrorStore>((set) => ({
  error: null,
  setError: (error) => {
    // Handle different error types gracefully
    const errorMessage =
      typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : error?.message || 'An unknown error occurred';
    set({ error: errorMessage });
  },
  clearError: () => {
    set({ error: null });
  },
}));

export default useErrorStore;
