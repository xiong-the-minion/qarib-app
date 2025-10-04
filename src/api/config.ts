export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000, // 10 seconds
};

export const API_ENDPOINTS = {
  TRANSCRIPTS: '/transcripts/',
  TRANSCRIPT_DETAIL: (id: string) => `/transcripts/${id}/`,
} as const;
