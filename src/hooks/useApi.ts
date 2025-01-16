import { useState, useCallback } from 'react';
import { ApiError } from '../services/api.service';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export function useApi<T>(apiFunc: (...args: any[]) => Promise<T>) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (...args: any[]) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await apiFunc(...args);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const apiError = error instanceof ApiError 
        ? error 
        : new ApiError(500, 'An unexpected error occurred');
      setState({ data: null, loading: false, error: apiError });
      throw apiError;
    }
  }, [apiFunc]);

  return { ...state, execute };
}