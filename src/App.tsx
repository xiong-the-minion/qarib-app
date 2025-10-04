import { useState } from "react";
import { useTranslation } from "react-i18next";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import FeatureCard from "./components/FeatureCard";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { TranscriptProvider } from "./contexts/TranscriptContext";
import { TranscriptsPage } from "./pages/TranscriptsPage";

function App() {
  const [count, setCount] = useState(0);
  const [showTranscripts, setShowTranscripts] = useState(false);
  const { t } = useTranslation();

  return (
    <TranscriptProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <LanguageSwitcher />
        <div className="container mx-auto px-4 py-16">
          {!showTranscripts ? (
            <div className="text-center">
              {/* Logo Section */}
              <div className="flex justify-center items-center space-x-8 rtl:space-x-reverse mb-12">
                <a
                  href="https://vite.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-transform duration-300 hover:scale-110"
                >
                  <img
                    src={viteLogo}
                    className="w-16 h-16 group-hover:drop-shadow-lg transition-all duration-300"
                    alt="Vite logo"
                  />
                </a>
                <a
                  href="https://react.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-transform duration-300 hover:scale-110"
                >
                  <img
                    src={reactLogo}
                    className="w-16 h-16 group-hover:drop-shadow-lg transition-all duration-300 animate-spin-slow"
                    alt="React logo"
                  />
                </a>
              </div>

              {/* Main Content */}
              <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("welcome.title")}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("welcome.subtitle")}
              </p>

              <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                <button
                  onClick={() => setCount((count) => count + 1)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  {t("counter.button", { count })}
                </button>
                <p className="mt-6 text-gray-600 dark:text-gray-300">
                  {t("counter.instructions")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <FeatureCard
                  title={t("features.vite.title")}
                  description={t("features.vite.description")}
                  icon="⚡"
                  gradient="bg-gradient-to-br from-yellow-400 to-orange-500"
                />
                <FeatureCard
                  title={t("features.react.title")}
                  description={t("features.react.description")}
                  icon="⚛️"
                  gradient="bg-gradient-to-br from-blue-400 to-cyan-500"
                />
                <FeatureCard
                  title={t("features.tailwind.title")}
                  description={t("features.tailwind.description")}
                  icon="🎨"
                  gradient="bg-gradient-to-br from-purple-400 to-pink-500"
                />
              </div>

              <div className="mt-12 space-y-4">
                <p className="text-gray-500 dark:text-gray-400">
                  {t("navigation.learnMore")}
                </p>
                <button
                  onClick={() => setShowTranscripts(true)}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  Go to /transcripts
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Transcript Management System
                </h1>
                <button
                  onClick={() => setShowTranscripts(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back to Home
                </button>
              </div>
              <TranscriptsPage />
            </div>
          )}
        </div>
      </div>
    </TranscriptProvider>
  );
}

export default App;
