import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import icons
import StarIcon from "/public/icons/favourites.svg?react";
import ChevronDownIcon from "/public/icons/chevron-down.svg?react";
import PlusIcon from "/public/icons/plus.svg?react";

// Import transcript table icons
import NameIcon from "/public/icons/transcript-table/name.svg?react";
import AgendaIcon from "/public/icons/transcript-table/agenda.svg?react";
import SpeakersIcon from "/public/icons/transcript-table/speakers.svg?react";
import StatusIcon from "/public/icons/transcript-table/stasuses.svg?react";
import DurationIcon from "/public/icons/transcript-table/duration.svg?react";
import DateIcon from "/public/icons/transcript-table/date.svg?react";
import AddIcon from "/public/icons/transcript-table/add.svg?react";

// Import view options icons
import TableIcon from "/public/icons/transcript-table/view-options/table.svg?react";
import GalleryIcon from "/public/icons/transcript-table/view-options/gallery.svg?react";
import CalendarIcon from "/public/icons/transcript-table/view-options/calendar.svg?react";
import ListIcon from "/public/icons/transcript-table/view-options/list.svg?react";
import FeedIcon from "/public/icons/transcript-table/view-options/feed.svg?react";

interface TranscriptListItem {
  id: string;
  title: string;
  summary: string;
  created_at: string;
  status: "Processing" | "Finished" | "Failed";
  tags: string[];
  speaker_count: number;
}

interface TranscriptsTableProps {
  transcripts: TranscriptListItem[];
  onTranscriptClick: (id: string) => void;
}

export const TranscriptsTable: React.FC<TranscriptsTableProps> = ({
  transcripts,
  onTranscriptClick,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-orange-100/30 text-orange-600 border border-orange-200/80";
      case "Finished":
        return "bg-green-100/30 text-green-600 border border-green-200/80";
      case "Failed":
        return "bg-red-100/30 text-red-600 border border-red-200/80";
      default:
        return "bg-gray-100/30 text-gray-600 border border-gray-200/80";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "Processing":
        return t('transcripts.status.processing');
      case "Finished":
        return t('transcripts.status.finished');
      case "Failed":
        return t('transcripts.status.failed');
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDuration = (createdAt: string) => {
    // Mock duration since it's not in the API
    return "17:00 -17:30 PM";
  };

  // Filter transcripts based on search query
  const filteredTranscripts = transcripts.filter((transcript) => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      transcript.title.toLowerCase().includes(query) ||
      transcript.summary?.toLowerCase().includes(query) ||
      transcript.status.toLowerCase().includes(query)
    );
  });

  const generateMockSpeakers = (speakerCount: number) => {
    const names = [
      "John Doe",
      "Jane Smith",
      "Mike Johnson",
      "Sarah Wilson",
      "Tom Brown",
      "Alice Cooper",
      "Bob Dylan",
    ];
    return Array.from({ length: Math.min(speakerCount, 5) }, (_, index) => ({
      name: names[index] || `Speaker ${index + 1}`,
      avatar:
        names[index]
          ?.split(" ")
          .map((n) => n[0])
          .join("") || `S${index + 1}`,
    }));
  };

  return (
    <div>
      {/* Header Section */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between space-x-4 w-full">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('transcripts.title')}
            </h2>

            {/* View Options */}
            <div className="flex items-center space-x-1 gap-3">
              {[
                {
                  id: "table",
                  label: t('transcripts.viewOptions.table'),
                  icon: <TableIcon className="w-4 h-4" />,
                },
                {
                  id: "gallery",
                  label: t('transcripts.viewOptions.gallery'),
                  icon: <GalleryIcon className="w-4 h-4" />,
                },
                {
                  id: "calendar",
                  label: t('transcripts.viewOptions.calendar'),
                  icon: <CalendarIcon className="w-4 h-4" />,
                },
                {
                  id: "list",
                  label: t('transcripts.viewOptions.list'),
                  icon: <ListIcon className="w-4 h-4" />,
                },
                {
                  id: "feed",
                  label: t('transcripts.viewOptions.feed'),
                  icon: <FeedIcon className="w-4 h-4" />,
                },
              ].map((view) => (
                <button
                  key={view.id}
                  className={`px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2.5 cursor-pointer ${
                    view.id === "table"
                      ? "bg-[#A8DADC]/25 text-[#1D3557]"
                      : "text-gray-500 bg-white"
                  }`}
                >
                  {view.icon}
                  <span>{view.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={t('common.search') + ' ' + t('transcripts.title').toLowerCase() + '...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            {/* Date Navigation */}
            <div className="flex items-center space-x-2 h-8 bg-white rounded-lg border border-gray-400/20">
              <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="#9CA3AF"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-sm font-medium text-gray-700">
                17.08.2025
              </span>
              <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="#9CA3AF"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Quick Date Filters */}
            <div className="flex items-center gap-1">
              {[
                { key: "today", label: t('transcripts.filters.today') },
                { key: "week", label: t('transcripts.filters.week') },
                { key: "month", label: t('transcripts.filters.month') },
                { key: "year", label: t('transcripts.filters.year') }
              ].map((filter) => (
                <button
                  key={filter.key}
                  className="h-8 px-3 text-xs font-medium text-gray-500 bg-white hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="flex items-center space-x-2">
              <select className="px-3 py-1 text-sm border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>{t('transcripts.filters.speaker')}</option>
              </select>
              <select className="px-3 py-1 text-sm border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>{t('transcripts.filters.tags')}</option>
              </select>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
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
                  d="M3 4h13M3 8h9m-9 4h6m4 0l3-3m0 0l3 3m-3-3v12"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
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
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white border-b border-gray-200">
            <tr className="h-9">
              <th className="px-6 h-9 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                <div className="h-full flex items-center">
                  <StarIcon className="w-5 h-5" />
                </div>
              </th>
              <th className="px-6 h-9 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                <div className="h-full flex items-center">
                  <div className="flex items-center space-x-2">
                    <NameIcon className="w-5 h-5" />
                    <span>{t('transcripts.columns.name')}</span>
                  </div>
                </div>
              </th>
              <th className="px-6 h-9 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                <div className="h-full flex items-center">
                  <div className="flex items-center space-x-2">
                    <AgendaIcon className="w-5 h-5" />
                    <span>{t('transcripts.columns.agenda')}</span>
                  </div>
                </div>
              </th>
              <th className="px-6 h-9 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                <div className="h-full flex items-center">
                  <div className="flex items-center space-x-2">
                    <SpeakersIcon className="w-5 h-5" />
                    <span>{t('transcripts.columns.speakers')}</span>
                  </div>
                </div>
              </th>
              <th className="px-6 h-9 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                <div className="h-full flex items-center">
                  <div className="flex items-center space-x-2">
                    <StatusIcon className="w-5 h-5" />
                    <span>{t('transcripts.columns.status')}</span>
                  </div>
                </div>
              </th>
              <th className="px-6 h-9 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                <div className="h-full flex items-center">
                  <div className="flex items-center space-x-2">
                    <DurationIcon className="w-5 h-5" />
                    <span>{t('transcripts.columns.duration')}</span>
                  </div>
                </div>
              </th>
              <th className="px-6 h-9 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                <div className="h-full flex items-center">
                  <div className="flex items-center space-x-2">
                    <DateIcon className="w-5 h-5" />
                    <span>{t('transcripts.columns.date')}</span>
                  </div>
                </div>
              </th>
              <th className="px-6 h-9 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="h-full flex items-center">
                  <div className="flex items-center space-x-2">
                    <AddIcon className="w-5 h-5" />
                    <span>Add</span>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredTranscripts.map((transcript, index) => {
              const mockSpeakers = generateMockSpeakers(
                transcript.speaker_count
              );
              const isEven = index % 2 === 0;
              return (
                <tr
                  key={transcript.id}
                  onClick={() => onTranscriptClick(transcript.id)}
                  className={`hover:bg-gray-50 cursor-pointer h-[90px] border-b border-gray-200 ${
                    isEven ? "bg-[#fafcfc]" : "bg-[#f9fafb]"
                  }`}
                >
                  <td className="px-6 h-[90px] whitespace-nowrap border-r border-gray-200">
                    <div className="h-full flex items-center">
                      <button
                        onClick={(e) => toggleFavorite(transcript.id, e)}
                        className="text-gray-400 hover:text-yellow-500 cursor-pointer"
                      >
                        <StarIcon
                          className={`w-4 h-4 ${
                            favorites.has(transcript.id)
                              ? "text-yellow-500 fill-current"
                              : ""
                          }`}
                        />
                      </button>
                    </div>
                  </td>
                  <td
                    className="px-6 h-[90px] border-r border-gray-200"
                    style={{ maxWidth: "212px", width: "212px" }}
                  >
                    <div className="h-full flex items-center">
                      <div className="flex items-center space-x-2 min-w-0 w-full">
                        <div className="w-4 h-4 bg-blue-200 rounded flex-shrink-0"></div>
                        <span className="text-sm font-medium text-gray-900 truncate min-w-0">
                          {transcript.title}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 h-[90px] border-r border-gray-200">
                    <div className="h-full flex items-center">
                      <div className="text-sm text-gray-900 max-w-sm line-clamp-3">
                        {transcript.summary || "No summary available"}
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-6 h-[90px] whitespace-nowrap border-r border-gray-200"
                    style={{ maxWidth: "158px" }}
                  >
                    <div className="h-full flex items-center">
                      <div className="flex items-center -space-x-2">
                        {mockSpeakers.slice(0, 3).map((speaker, index) => (
                          <img
                            key={index}
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              speaker.name
                            )}&size=24&background=random&color=fff&rounded=true`}
                            alt={speaker.name}
                            className="w-6 h-6 rounded-full border-2 border-white"
                            style={{ zIndex: 3 - index }}
                          />
                        ))}
                        {mockSpeakers.length > 3 && (
                          <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center ml-1">
                            <span className="text-xs text-gray-500 font-medium">
                              +{mockSpeakers.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-6 h-[90px] whitespace-nowrap border-r border-gray-200"
                    style={{ maxWidth: "132px" }}
                  >
                    <div className="h-full flex items-center">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          transcript.status
                        )}`}
                      >
                        {getStatusText(transcript.status)}
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-6 h-[90px] whitespace-nowrap border-r border-gray-200"
                    style={{ maxWidth: "100px" }}
                  >
                    <div className="h-full flex items-center">
                      <span className="text-sm text-gray-900">
                        {formatDuration(transcript.created_at)}
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-6 h-[90px] whitespace-nowrap border-r border-gray-200"
                    style={{ maxWidth: "121px" }}
                  >
                    <div className="h-full flex items-center">
                      <span className="text-sm text-gray-900">
                        {formatDate(transcript.created_at)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 h-[90px] whitespace-nowrap">
                    <div className="h-full flex items-center">
                      <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add New Row */}
      <div className="px-6 py-4">
        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
          <PlusIcon className="w-4 h-4" />
          <span>{t('transcripts.addNew')}</span>
        </button>
      </div>
    </div>
  );
};
