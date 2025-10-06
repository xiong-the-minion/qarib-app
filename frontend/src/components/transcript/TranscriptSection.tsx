import React from "react";
import { copyToClipboard, formatDialogue } from "../../utils/copyUtils";
import CopyIcon from "/src/assets/icons/copy.svg?react";

interface TranscriptEntry {
  id: number;
  speaker: string;
  timestamp: string;
  text: string;
  avatar: string;
}

interface TranscriptSectionProps {
  entries: TranscriptEntry[];
}

export const TranscriptSection: React.FC<TranscriptSectionProps> = ({
  entries,
}) => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Transcript:</h3>
        <div className="flex items-center space-x-2"></div>
      </div>

      {/* Transcript Entries */}
      <div className="space-y-4 max-h-96 overflow-y-auto bg-white/60 rounded-xl p-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start justify-between p-3 hover:bg-gradient-to-b from-[#E9F5F6] to-white rounded-lg transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(entry.speaker)}&size=32&background=random&color=fff&rounded=true`}
                  alt={entry.speaker}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'inline';
                  }}
                />
                <span 
                  className="text-xs font-medium text-gray-700 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
                  style={{ display: 'none' }}
                >
                  {entry.avatar}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {entry.speaker}
                </span>
                <span className="text-xs text-gray-500">{entry.timestamp}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {entry.text}
              </p>
            </div>
            <button
              onClick={async () => {
                const formattedDialogue = formatDialogue(entry);
                const success = await copyToClipboard(formattedDialogue);
                if (success) {
                  console.log("Dialogue copied to clipboard");
                }
              }}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy dialogue"
            >
              <CopyIcon className="w-[18px] h-[18px]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
