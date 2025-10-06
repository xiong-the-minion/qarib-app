import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranscript } from "../contexts/TranscriptContext";
import { useTranslation } from "react-i18next";
import {
  SummarySection,
  ParticipantsSection,
  KeywordsSection,
  TranscriptSection,
} from "../components/transcript";
import { getDefaultTagColor, parseTranscriptContent } from "../utils/transcriptUtils";
import { copyToClipboard, formatCompleteTranscript } from "../utils/copyUtils";

// Import icons
import CopyIcon from "/public/icons/copy.svg?react";

export const TranscriptDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loadedTranscript, isLoading, error, loadTranscriptById } =
    useTranscript();
  const [activeTab, setActiveTab] = useState<
    "summary" | "transcript" | "screenshot"
  >("transcript");

  useEffect(() => {
    if (id) {
      loadTranscriptById(id);
    }
  }, [id, loadTranscriptById]);

  if (isLoading) {
    return (
      <div className="px-12 min-h-screen">
        {/* Loading Header */}
        <div className="px-6 pb-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="flex flex-col gap-6 pt-[60px] pb-6 px-[120px]">
          {/* Meeting Header Skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className="animate-pulse">
            <div className="flex space-x-6 border-b border-gray-200">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-28"></div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="p-8 max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            {t('transcriptDetail.error')}
          </h2>
          <p className="text-red-600 mb-6">
            {typeof error === "string" ? error : error.message}
          </p>
          <button
            onClick={() => navigate("/transcripts")}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  if (!loadedTranscript) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="p-8 max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Transcript Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested transcript could not be found.
          </p>
          <button
            onClick={() => navigate("/transcripts")}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Transcripts
          </button>
        </div>
      </div>
    );
  }

  // Transform API data for display
  const participants = loadedTranscript?.speakers?.map((speaker) => ({
    id: parseInt(speaker.id) || 0,
    name: speaker.name,
    speakingPercentage: Math.round(speaker.speaking_percentage),
    avatar: speaker.name.split(' ').map(n => n[0]).join('').toUpperCase(),
  })) || [];

  // Use API tags if available, otherwise show mock tags
  const transcriptTags = loadedTranscript?.transcript_tags?.length > 0 
    ? loadedTranscript.transcript_tags.map((tag, index) => ({
        name: tag.name,
        color: tag.color || getDefaultTagColor(index),
      }))
    : [
        { name: "Meeting", color: getDefaultTagColor(0) },
        { name: "Important", color: getDefaultTagColor(1) },
        { name: "Follow-up", color: getDefaultTagColor(2) },
      ];

  // Parse transcript content into entries (this is a simplified version)
  // In a real app, you might want to store structured transcript entries in the API
  const transcriptEntries = loadedTranscript?.content ? 
    parseTranscriptContent(loadedTranscript.content) : [];

  return (
    <div className="px-12 min-h-screen">

      {/* Main Content */}
      <div className="flex flex-col gap-6 pt-[60px] pb-6 px-[120px]">
        {/* Meeting Header */}
        <div className="">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center flex-wrap gap-3">
              <h1 className="text-3xl font-bold text-gray-900">
                {loadedTranscript.title}
              </h1>
              
              {/* Tags */}
              <div className="flex items-center flex-wrap gap-2">
                {transcriptTags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-1.5 py-1 rounded-sm text-xs font-medium ${tag.color}`}
                  >
                    {tag.name}
                  </span>
                ))}
                <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover: transition-colors">
                  <span className="text-gray-600 text-sm">+</span>
                </button>
              </div>
            </div>

            {/* Copy Button */}
            <button 
              onClick={async () => {
                if (transcriptEntries.length > 0) {
                  const formattedTranscript = formatCompleteTranscript(transcriptEntries);
                  const success = await copyToClipboard(formattedTranscript);
                  if (success) {
                    // You could add a toast notification here
                    console.log('Transcript copied to clipboard');
                  }
                }
              }}
              className="p-2 text-gray-700 bg-white/50 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              title="Copy complete transcript"
            >
              <CopyIcon className="w-[18px] h-[18px]" />
            </button>
          </div>

          {/* Meeting Info */}
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            {participants.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">{participants[0].avatar}</span>
                </div>
                <span className="text-sm text-gray-800 font-semibold">
                  {participants[0].name}
                </span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{new Date(loadedTranscript.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{loadedTranscript.status}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-3">
            {[
              { id: "summary", label: t('transcriptDetail.tabs.summary') },
              { id: "transcript", label: t('transcriptDetail.tabs.transcript') },
              { id: "screenshot", label: t('transcriptDetail.tabs.screenshot') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-full py-2 px-4 text-xs font-semibold transition-colors ${
                  activeTab === tab.id ? "bg-[#A8DADC]/25 text-[#1D3557]" : "bg-white/50 text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Section - Full Width */}
        <SummarySection summary={loadedTranscript.summary} />

        {/* Two Equal Sections - 50/50 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px]">
          <ParticipantsSection participants={participants} />
          <KeywordsSection keywords="Lorem ipsum dolor sit amet consectetur. Mi fermentum aliquet non aliquam sed. Diam tincidunt gravida sed aliquam ullamcorper cras. Nec est lorem est urna purus at." />
        </div>

        {/* Transcript Section - Full Width */}
        <TranscriptSection entries={transcriptEntries} />
      </div>
    </div>
  );
};
