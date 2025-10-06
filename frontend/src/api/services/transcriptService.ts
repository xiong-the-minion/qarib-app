import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ApiResponse } from '../types';
import type { 
  TranscriptDetail, 
  TranscriptListResponse 
} from '../../types/transcript';

export interface TranscriptListParams {
  page?: number;
  page_size?: number;
  search?: string;
  status?: 'Processing' | 'Finished' | 'Failed';
  tags?: string[];
  ordering?: string;
}

export class TranscriptService {
  /**
   * Fetch list of transcripts with pagination and filtering
   */
  async getTranscripts(
    params: TranscriptListParams = {}
  ): Promise<ApiResponse<TranscriptListResponse>> {
    return apiClient.get<TranscriptListResponse>(
      API_ENDPOINTS.TRANSCRIPTS,
      params
    );
  }

  /**
   * Fetch detailed transcript by ID
   */
  async getTranscriptById(
    id: string
  ): Promise<ApiResponse<TranscriptDetail>> {
    return apiClient.get<TranscriptDetail>(
      API_ENDPOINTS.TRANSCRIPT_DETAIL(id)
    );
  }
}

export const transcriptService = new TranscriptService();
