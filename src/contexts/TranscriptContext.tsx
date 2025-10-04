import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { TranscriptDetail, TranscriptListItem, TranscriptListResponse } from '../types/transcript';

// Context type definition
export interface TranscriptContextType {
  // State
  transcripts: TranscriptListItem[];
  loadedTranscript: TranscriptDetail | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadTranscripts: () => Promise<void>;
  loadTranscriptById: (id: string) => Promise<void>;
  clearLoadedTranscript: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

// Action types
type TranscriptAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TRANSCRIPTS'; payload: TranscriptListItem[] }
  | { type: 'SET_LOADED_TRANSCRIPT'; payload: TranscriptDetail | null }
  | { type: 'CLEAR_LOADED_TRANSCRIPT' };

// Initial state
interface TranscriptState {
  transcripts: TranscriptListItem[];
  loadedTranscript: TranscriptDetail | null;
  isLoading: boolean;
  error: string | null;
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

  // Mock API functions - replace with actual API calls
  const mockLoadTranscripts = async (): Promise<TranscriptListResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      count: 3,
      next: null,
      previous: null,
      results: [
        {
          id: "5bea904f-ac09-45c3-8829-6b45bb2c9004",
          title: "Mohammed_Ameera_Meetings",
          summary: "Mohammed Zaghloul (msalahz)  0:05  \nHello, Ameera, can you hear me. Hello,\n\nMohammed Zaghloul (msalahz)  0:15  \nhello, Am. Mohammed Zaghloul (msalahz)  0:42  \nI.",
          created_at: "2025-10-03T21:45:44.100731Z",
          status: "Finished",
          tags: [],
          speaker_count: 2
        },
        {
          id: "8cfd6d2e-7219-473b-8019-eb9e66e5c5a4",
          title: "Meet 1",
          summary: "Ameera Kawash  0:00  \nGet started, and then I'll explain a little bit more about what we are building and designing. Hulma  0:05  \nYeah, sure. Thank you.",
          created_at: "2025-10-03T21:45:44.076262Z",
          status: "Finished",
          tags: [],
          speaker_count: 3
        },
        {
          id: "29e94b84-a78e-4fb2-8563-d04bdda983d7",
          title: "Hulma_Interview",
          summary: "Ameera Kawash  0:00  \nGet started, and then I'll explain a little bit more about what we are building and designing. Hulma  0:05  \nYeah, sure. Thank you.",
          created_at: "2025-10-03T21:45:44.063923Z",
          status: "Finished",
          tags: [],
          speaker_count: 3
        }
      ]
    };
  };

  const mockLoadTranscriptById = async (id: string): Promise<TranscriptDetail> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock detailed transcript data
    const mockTranscripts: Record<string, TranscriptDetail> = {
      "5bea904f-ac09-45c3-8829-6b45bb2c9004": {
        id: "5bea904f-ac09-45c3-8829-6b45bb2c9004",
        title: "Mohammed_Ameera_Meetings",
        content: "Mohammed Zaghloul (msalahz)  0:05  \nHello, Ameera, can you hear me. Hello,\n\nMohammed Zaghloul (msalahz)  0:15  \nhello, Am. Mohammed Zaghloul (msalahz)  0:42  \nI.",
        summary: "Mohammed Zaghloul (msalahz)  0:05  \nHello, Ameera, can you hear me. Hello,\n\nMohammed Zaghloul (msalahz)  0:15  \nhello, Am. Mohammed Zaghloul (msalahz)  0:42  \nI.",
        created_at: "2025-10-03T21:45:44.100731Z",
        status: "Finished",
        speakers: [
          {
            id: "0dbf7449-768a-419b-a9b2-f1616bc94aaa",
            name: "Ameera Kawash",
            speaking_percentage: 65.00893388921978
          },
          {
            id: "b72f487b-5aa2-4e60-b164-17e4632e509a",
            name: "Taha Shahzad",
            speaking_percentage: 34.99106611078023
          }
        ],
        transcript_tags: [],
        tags: []
      }
    };

    return mockTranscripts[id] || mockTranscripts["5bea904f-ac09-45c3-8829-6b45bb2c9004"];
  };

  // Context actions
  const loadTranscripts = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await mockLoadTranscripts();
      dispatch({ type: 'SET_TRANSCRIPTS', payload: response.results });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load transcripts' });
    }
  };

  const loadTranscriptById = async (id: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const transcript = await mockLoadTranscriptById(id);
      dispatch({ type: 'SET_LOADED_TRANSCRIPT', payload: transcript });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load transcript' });
    }
  };

  const clearLoadedTranscript = (): void => {
    dispatch({ type: 'CLEAR_LOADED_TRANSCRIPT' });
  };

  const setError = (error: string | null): void => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setLoading = (loading: boolean): void => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

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
