import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FeatureCard from './components/FeatureCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          {/* Logo Section */}
          <div className="flex justify-center items-center space-x-8 mb-12">
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
          <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Vite + React + TypeScript
          </h1>
          
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Count is {count}
            </button>
            <p className="mt-6 text-gray-600 dark:text-gray-300">
              Edit <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">src/App.tsx</code> and save to test HMR
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <FeatureCard
              title="⚡ Vite"
              description="Lightning fast build tool and dev server with HMR"
              icon="⚡"
              gradient="bg-gradient-to-br from-yellow-400 to-orange-500"
            />
            <FeatureCard
              title="⚛️ React"
              description="A JavaScript library for building user interfaces"
              icon="⚛️"
              gradient="bg-gradient-to-br from-blue-400 to-cyan-500"
            />
            <FeatureCard
              title="🎨 Tailwind"
              description="Utility-first CSS framework for rapid UI development"
              icon="🎨"
              gradient="bg-gradient-to-br from-purple-400 to-pink-500"
            />
          </div>

          <p className="mt-12 text-gray-500 dark:text-gray-400">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
