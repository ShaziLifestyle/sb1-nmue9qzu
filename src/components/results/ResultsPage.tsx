import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { fetchPromptResults, createPromptResult, fetchPromptDetails } from '../../lib/api/promptApi';
import { ResultsList } from './ResultsList';
import { ResultForm } from './ResultForm';
import { SearchBar } from '../common/SearchBar';
import { useSearch } from '../../hooks/useSearch';
import type { PromptResult } from '../../lib/types';

interface PromptDetails {
  id: string;
  content: string;
  task: {
    id: string;
    name: string;
    agent: {
      id: string;
      name: string;
    }
  }
}

export default function ResultsPage() {
  const { promptId } = useParams();
  const [results, setResults] = useState<PromptResult[]>([]);
  const [promptDetails, setPromptDetails] = useState<PromptDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = useSearch(results, ['content'], searchTerm);

  useEffect(() => {
    if (!promptId) return;

    async function loadData() {
      const [resultsData, details] = await Promise.all([
        fetchPromptResults(promptId),
        fetchPromptDetails(promptId)
      ]);

      setResults(resultsData);
      setPromptDetails(details);
      setIsLoading(false);
    }

    loadData();
  }, [promptId]);

  if (isLoading || !promptDetails) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  async function handleSubmitResult(content: string) {
    if (!promptId) return;
    
    await createPromptResult(promptId, content);
    const updatedResults = await fetchPromptResults(promptId);
    setResults(updatedResults);
    setShowForm(false);
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link 
          to={`/tasks/${promptDetails.task.id}/prompts`}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back to Prompts
        </Link>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg mb-8">
        <div className="mb-4">
          <h2 className="text-3xl font-bold mb-2">Results</h2>
          <p className="text-indigo-200">
            Agent: {promptDetails.task.agent.name} | 
            Task: {promptDetails.task.name}
          </p>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-2">Prompt:</h3>
          <p className="text-indigo-50">{promptDetails.content}</p>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search results by content..."
        />
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
        >
          <Plus size={20} /> Generate New Result
        </button>
      </div>

      <ResultsList results={filteredResults} />

      {showForm && (
        <ResultForm
          promptContent={promptDetails.content}
          onSubmit={handleSubmitResult}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}