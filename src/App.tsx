import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AgentList from './components/AgentList';
import TaskList from './components/TaskList';
import PromptList from './components/PromptList';
import ResultsPage from './components/results/ResultsPage';
import { seedAllData } from './lib/seedData';
import { checkSupabaseConnection } from './lib/supabase';

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function initialize() {
      setIsChecking(true);
      const connected = await checkSupabaseConnection();
      setIsConnected(connected);
      if (connected) {
        await seedAllData();
      }
      setIsChecking(false);
    }
    initialize();
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-indigo-600 mb-4">Connecting to Database...</h1>
          <p className="text-gray-600">Please wait while we establish the connection.</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h1>
          <p className="text-gray-600 mb-6">
            Unable to connect to the database. Please click the "Connect to Supabase" button in the top right corner to set up the connection.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
          <div className="max-w-7xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-white">
              AI Agent Worker System
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<AgentList />} />
            <Route path="/agents/:agentId/tasks" element={<TaskList />} />
            <Route path="/tasks/:taskId/prompts" element={<PromptList />} />
            <Route path="/prompts/:promptId/results" element={<ResultsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}