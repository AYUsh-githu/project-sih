import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";

export interface PageLoadingContextValue {
  isLoading: boolean;
  error: string | null;
  startDataFetch: () => void;
  markDataReady: () => void;
  reportError: (errorMessage?: string) => void;
  retryLoading: () => void;
  activePath: string;
}

const PageLoadingContext = createContext<PageLoadingContextValue | undefined>(
  undefined
);

const MIN_SKELETON_DURATION_MS = 1700;

interface PageLoadingProviderProps {
  children: React.ReactNode;
}

export const PageLoadingProvider: React.FC<PageLoadingProviderProps> = ({
  children,
}) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Tracks whether minimum duration has passed
  const minDurationPassedRef = useRef<boolean>(false);
  // Tracks whether page async data is ready
  const isDataReadyRef = useRef<boolean>(true);
  // Active timeout timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // Current path tracker
  const currentPathRef = useRef<string>(location.pathname);

  const finishLoadingIfReady = useCallback(() => {
    if (minDurationPassedRef.current && isDataReadyRef.current) {
      setIsLoading(false);
    }
  }, []);

  const triggerLoading = useCallback(() => {
    setIsLoading(true);
    setError(null);
    minDurationPassedRef.current = false;
    isDataReadyRef.current = true;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      minDurationPassedRef.current = true;
      finishLoadingIfReady();
    }, MIN_SKELETON_DURATION_MS);
  }, [finishLoadingIfReady]);

  // Trigger on route change
  useEffect(() => {
    currentPathRef.current = location.pathname;
    triggerLoading();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [location.pathname, triggerLoading]);

  const startDataFetch = useCallback(() => {
    isDataReadyRef.current = false;
    setIsLoading(true);
  }, []);

  const markDataReady = useCallback(() => {
    isDataReadyRef.current = true;
    finishLoadingIfReady();
  }, [finishLoadingIfReady]);

  const reportError = useCallback((errorMessage?: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsLoading(false);
    setError(
      errorMessage ||
        "An unexpected interruption occurred while preparing this page."
    );
  }, []);

  const retryLoading = useCallback(() => {
    triggerLoading();
  }, [triggerLoading]);

  const value: PageLoadingContextValue = {
    isLoading,
    error,
    startDataFetch,
    markDataReady,
    reportError,
    retryLoading,
    activePath: location.pathname,
  };

  return (
    <PageLoadingContext.Provider value={value}>
      {children}
    </PageLoadingContext.Provider>
  );
};

export const usePageLoading = (): PageLoadingContextValue => {
  const context = useContext(PageLoadingContext);
  if (!context) {
    throw new Error("usePageLoading must be used within a PageLoadingProvider");
  }
  return context;
};
