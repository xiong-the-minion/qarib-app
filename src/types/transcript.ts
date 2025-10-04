export interface Speaker {
  id: string;
  name: string;
  speaking_percentage: number;
}

export interface TranscriptTag {
  id: string;
  name: string;
  color?: string;
}

export interface TranscriptDetail {
  id: string;
  title: string;
  content: string;
  summary: string;
  created_at: string;
  status: "Processing" | "Finished" | "Failed";
  speakers: Speaker[];
  transcript_tags: TranscriptTag[];
  tags: string[];
}

export interface TranscriptListItem {
  id: string;
  title: string;
  summary: string;
  created_at: string;
  status: "Processing" | "Finished" | "Failed";
  tags: string[];
  speaker_count: number;
}

export interface TranscriptListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TranscriptListItem[];
}
