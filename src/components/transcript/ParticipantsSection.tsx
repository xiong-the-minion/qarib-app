import React from 'react';

interface Participant {
  id: number;
  name: string;
  speakingPercentage: number;
  avatar: string;
}

interface ParticipantsSectionProps {
  participants: Participant[];
}

export const ParticipantsSection: React.FC<ParticipantsSectionProps> = ({ participants }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Participants:</h3>
      <div className="space-y-3">
        {participants.map((participant) => (
          <div key={participant.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700">{participant.avatar}</span>
              </div>
              <span className="text-sm text-gray-700">{participant.name}</span>
            </div>
            <span className="text-sm text-gray-500">{participant.speakingPercentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
