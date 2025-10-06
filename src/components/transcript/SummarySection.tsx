import React from 'react';

interface SummarySectionProps {
  summary: string;
}

export const SummarySection: React.FC<SummarySectionProps> = ({ summary }) => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
      <p className="text-gray-700 leading-relaxed">{summary}</p>
    </div>
  );
};
