import React, { useEffect, useState } from 'react';
import { useTranscript } from '../contexts/TranscriptContext';

export const TranscriptsPage: React.FC = () => {
  const { 
    transcripts, 
    loadedTranscript, 
    isLoading, 
    error, 
    loadTranscripts, 
    loadTranscriptById 
  } = useTranscript();

  const [selectedTranscriptId, setSelectedTranscriptId] = useState<string | null>(null);

  // Load transcripts on component mount
  useEffect(() => {
    loadTranscripts();
  }, [loadTranscripts]);

  const handleLoadTranscript = (id: string) => {
    setSelectedTranscriptId(id);
    loadTranscriptById(id);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'monospace', 
      backgroundColor: 'black', 
      color: 'white',
      minHeight: '100vh'
    }}>
      <div>=== TRANSCRIPTS API TEST ===</div>
      <br />
      
      {/* Loading State */}
      {isLoading && (
        <div>
          <div>Loading...</div>
          <br />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div>
          <div>Error:</div>
          <pre>{JSON.stringify(error, null, 2)}</pre>
          <br />
        </div>
      )}

      {/* Transcripts List */}
      <div>
        <div>Transcripts List ({transcripts.length})</div>
        <div onClick={() => loadTranscripts()} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          [Refresh List]
        </div>
        <br />
        
        <div>Raw JSON Response:</div>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
          {JSON.stringify(transcripts, null, 2)}
        </pre>
        <br />

        {/* Clickable transcript items */}
        <div>Click to load details:</div>
        {transcripts.map(transcript => (
          <div 
            key={transcript.id} 
            onClick={() => handleLoadTranscript(transcript.id)}
            style={{ 
              cursor: 'pointer',
              textDecoration: 'underline',
              margin: '5px 0'
            }}
          >
            {transcript.title} - {transcript.status} ({transcript.speaker_count} speakers)
          </div>
        ))}
        <br />
      </div>

      {/* Selected Transcript Details */}
      {loadedTranscript && (
        <div>
          <div>Selected Transcript Details:</div>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
            {JSON.stringify(loadedTranscript, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
