import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranscript } from '../contexts/TranscriptContext';
import { TranscriptsTable } from '../components/TranscriptsTable';

export const TranscriptsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    transcripts, 
    isLoading, 
    error, 
    loadTranscripts
  } = useTranscript();

  // Load transcripts on component mount
  useEffect(() => {
    loadTranscripts();
  }, [loadTranscripts]);

  const handleTranscriptClick = (id: string) => {
    navigate(`/transcripts/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading transcripts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error loading transcripts</div>
          <p className="text-gray-600">{typeof error === 'string' ? error : error.message}</p>
        </div>
      </div>
    );
  }

  if (transcripts.length === 0) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-xl mb-4">No transcripts found</div>
          <p className="text-gray-500 mb-6">Start by creating your first transcript</p>
          <button 
            onClick={() => navigate('/transcripts')}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Create New Transcript
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <TranscriptsTable 
        transcripts={transcripts} 
        onTranscriptClick={handleTranscriptClick}
      />
    </div>
  );
};
