import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranscript } from "../contexts/TranscriptContext";
import {
  SummarySection,
  ParticipantsSection,
  KeywordsSection,
  TranscriptSection,
} from "../components/transcript";

// Import icons
import BellIcon from "/public/icons/bell.svg?react";
import ChevronDownIcon from "/public/icons/chevron-down.svg?react";

export const TranscriptDetailPage: React.FC = () => {
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
      <div className="min-h-screen ">
        <div className="animate-pulse">
          <div className="h-16 "></div>
          <div className="p-6">
            <div className="h-8  rounded w-1/3 mb-4"></div>
            <div className="h-4  rounded w-1/2 mb-2"></div>
            <div className="h-4  rounded w-3/4 mb-4"></div>
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
            Error Loading Transcript
          </h2>
          <p className="text-red-600 mb-6">
            {typeof error === "string" ? error : error.message}
          </p>
          <button
            onClick={() => navigate("/transcripts")}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Transcripts
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

  // Mock data for demonstration - in real app this would come from the API
  const mockParticipants = [
    { id: 1, name: "Jeff Mize", speakingPercentage: 33, avatar: "JM" },
    { id: 2, name: "Sonny Thompson", speakingPercentage: 12, avatar: "ST" },
    { id: 3, name: "Cameron Williamson", speakingPercentage: 65, avatar: "CW" },
    { id: 4, name: "Leon Arnoul", speakingPercentage: 34, avatar: "LA" },
    { id: 5, name: "Clarence Ford", speakingPercentage: 4, avatar: "CF" },
  ];

  const mockTranscriptEntries = [
    {
      id: 1,
      speaker: "Cameron Williamson",
      timestamp: "02:07",
      text: "Hey!",
      avatar: "CW",
    },
    {
      id: 2,
      speaker: "Sonny Thompson",
      timestamp: "02:07",
      text: "yeah, it's good. I am. I talked to I met one on mobile and ended up being someone who worked in international development, and we just now are professional friends, which is fantastic, but she recommended this Zayed prize from Abu Dhabi, and apparently it's hosted by the Mazda foundation. Mazda is a smart cities, and I actually met the director of one of the directors of monster yesterday.",
      avatar: "ST",
    },
    {
      id: 3,
      speaker: "Clarence Ford",
      timestamp: "02:07",
      text: "yeah, it's good. I am. I talked to I met one on mobile and ended up being someone who worked in international development, and we just now are professional friends, which is fantastic, but she recommended this Zayed prize from Abu Dhabi, and apparently it's hosted by the Mazda foundation. Mazda is a smart cities, and I actually met the director of one of the directors of monster yesterday.",
      avatar: "CF",
    },
  ];

  const mockTags = [
    { name: "Harvest Grant", color: "bg-green-100 text-green-800" },
    { name: "Zayed Prize", color: "bg-blue-100 text-blue-800" },
    { name: "Civitam Anniversary", color: "bg-orange-100 text-orange-800" },
    { name: "Terrain Correction", color: "bg-purple-100 text-purple-800" },
  ];

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => navigate("/")}
              className="hover:text-gray-900 transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => navigate("/transcripts")}
              className="hover:text-gray-900 transition-colors"
            >
              Transcripts
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {loadedTranscript.title}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* <button className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <span>Share</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button> */}
            {/* <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <span>Post in Slack</span>
              <div className="w-4 h-4 bg-purple-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">S</span>
              </div>
            </button> */}
            <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <BellIcon className="w-5 h-5" />
            </button> 
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Meeting Header */}
        <div className="p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {loadedTranscript.title}
          </h1>

          {/* Tags */}
          <div className="flex items-center space-x-2 mb-4">
            {mockTags.map((tag, index) => (
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

          {/* Meeting Info */}
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6  rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700">CW</span>
              </div>
              <span className="text-sm text-gray-800 font-semibold">
                Cameron Williamson
              </span>
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>May 17, 2025</span>
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
              <span>2:30 PM - 3:20 PM (10 min)</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 border-b border-gray-200">
            {[
              { id: "summary", label: "Summary" },
              { id: "transcript", label: "Transcript" },
              { id: "screenshot", label: "Screenshot" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ParticipantsSection participants={mockParticipants} />
          <KeywordsSection />
        </div>

        {/* Transcript Section - Full Width */}
        <TranscriptSection entries={mockTranscriptEntries} />
      </div>
    </div>
  );
};
