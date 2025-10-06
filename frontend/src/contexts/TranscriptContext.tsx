import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { TranscriptDetail, TranscriptListItem } from '../types/transcript';
import { transcriptService } from '../api/services/transcriptService';
import type { ApiError } from '../api/types';

// Context type definition
export interface TranscriptContextType {
  // State
  transcripts: TranscriptListItem[];
  loadedTranscript: TranscriptDetail | null;
  isLoading: boolean;
  error: ApiError | string | null;
  
  // Actions
  loadTranscripts: (params?: { page?: number; search?: string; status?: string; tags?: string[] }) => Promise<void>;
  loadTranscriptById: (id: string) => Promise<void>;
  clearLoadedTranscript: () => void;
  setError: (error: ApiError | string | null) => void;
  setLoading: (loading: boolean) => void;
}

// Action types
type TranscriptAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: ApiError | string | null }
  | { type: 'SET_TRANSCRIPTS'; payload: TranscriptListItem[] }
  | { type: 'SET_LOADED_TRANSCRIPT'; payload: TranscriptDetail | null }
  | { type: 'CLEAR_LOADED_TRANSCRIPT' };

// Initial state
interface TranscriptState {
  transcripts: TranscriptListItem[];
  loadedTranscript: TranscriptDetail | null;
  isLoading: boolean;
  error: ApiError | string | null;
}

const initialState: TranscriptState = {
  transcripts: [],
  loadedTranscript: null,
  isLoading: false,
  error: null,
};

// Reducer
const transcriptReducer = (state: TranscriptState, action: TranscriptAction): TranscriptState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_TRANSCRIPTS':
      return { ...state, transcripts: action.payload, isLoading: false, error: null };
    case 'SET_LOADED_TRANSCRIPT':
      return { ...state, loadedTranscript: action.payload, isLoading: false, error: null };
    case 'CLEAR_LOADED_TRANSCRIPT':
      return { ...state, loadedTranscript: null };
    default:
      return state;
  }
};

// Create context
const TranscriptContext = createContext<TranscriptContextType | undefined>(undefined);

// Provider component
interface TranscriptProviderProps {
  children: ReactNode;
}

export const TranscriptProvider: React.FC<TranscriptProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(transcriptReducer, initialState);

  // Helper function to handle API errors
  const handleApiError = useCallback((error: any): ApiError => {
    if (error?.message) {
      return {
        message: error.message,
        status: error.status,
        code: error.code || 'NETWORK_ERROR',
      };
    }
    
    return {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
    };
  }, []);

  // Context actions
  const loadTranscripts = useCallback(async (params?: { 
    page?: number; 
    search?: string; 
    status?: string; 
    tags?: string[] 
  }): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await transcriptService.getTranscripts({
        page: params?.page,
        search: params?.search,
        status: params?.status as any,
        tags: params?.tags,
      });
      
      dispatch({ type: 'SET_TRANSCRIPTS', payload: response.data.results });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: handleApiError(error) });
    }
  }, [handleApiError]);

  const loadTranscriptById = useCallback(async (id: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await transcriptService.getTranscriptById(id);
      dispatch({ type: 'SET_LOADED_TRANSCRIPT', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: handleApiError(error) });
    }
  }, [handleApiError]);

  const clearLoadedTranscript = useCallback((): void => {
    dispatch({ type: 'CLEAR_LOADED_TRANSCRIPT' });
  }, []);

  const setError = useCallback((error: ApiError | string | null): void => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const setLoading = useCallback((loading: boolean): void => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const contextValue: TranscriptContextType = {
    // State
    transcripts: state.transcripts,
    loadedTranscript: state.loadedTranscript,
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions
    loadTranscripts,
    loadTranscriptById,
    clearLoadedTranscript,
    setError,
    setLoading,
  };

  return (
    <TranscriptContext.Provider value={contextValue}>
      {children}
    </TranscriptContext.Provider>
  );
};

// Custom hook
export const useTranscript = (): TranscriptContextType => {
  const context = useContext(TranscriptContext);
  if (context === undefined) {
    throw new Error('useTranscript must be used within a TranscriptProvider');
  }
  return context;
};
