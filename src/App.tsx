import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Layout from "./components/Layout";
import { TranscriptProvider } from "./contexts/TranscriptContext";
import { TranscriptsPage } from "./pages/TranscriptsPage";
import { TranscriptDetailPage } from "./pages/TranscriptDetailPage";

function HomePage() {

  return (
    <div className="p-6 text-center">
      {/* Main Content */}
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Qarib
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Qarib, a bilingual meeting intelligence platform (Otter.ai alternative).
      </p>

      <div className="mt-8">
        <a
          href="/transcripts"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          View Transcripts
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <TranscriptProvider>
      <Router>
        <Layout>
          <LanguageSwitcher />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/transcripts" element={<TranscriptsPage />} />
            <Route path="/transcripts/:id" element={<TranscriptDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </TranscriptProvider>
  );
}

export default App;