import React from 'react';

interface KeywordsSectionProps {
  keywords?: string;
}

export const KeywordsSection: React.FC<KeywordsSectionProps> = ({ 
  keywords = "Lorem ipsum dolor sit amet consectetur. Mi fermentum aliquet non aliquam sed. Diam tincidunt gravida sed aliquam ullamcorper cras. Nec est lorem est urna purus at."
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Keywords:</h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {keywords}
      </p>
    </div>
  );
};
