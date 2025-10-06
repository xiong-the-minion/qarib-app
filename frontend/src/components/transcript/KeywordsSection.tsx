import React from 'react';

interface KeywordsSectionProps {
  keywords?: string;
}

export const KeywordsSection: React.FC<KeywordsSectionProps> = ({ 
  keywords = "Lorem ipsum dolor sit amet consectetur. Mi fermentum aliquet non aliquam sed. Diam tincidunt gravida sed aliquam ullamcorper cras. Nec est lorem est urna purus at."
}) => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Keywords:</h3>
      <div className="bg-white/60 rounded-xl p-4 flex-1">
        <p className="text-sm text-gray-600 leading-relaxed">
          {keywords}
        </p>
      </div>
    </div>
  );
};
