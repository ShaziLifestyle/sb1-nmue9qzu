import { useState } from 'react';
import { generateAgentProcess, updateAgentProcess } from '../lib/utils/agentProcess';
import type { Agent } from '../lib/types';

export function useAgentProcess(agent: Agent) {
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleProcess() {
    try {
      setError(null);
      setIsProcessing(true);
      
      await updateAgentProcess(agent);
      setShowProcessModal(true);
    } catch (err) {
      console.error('Process failed:', err);
      setError('Failed to process agent data');
    } finally {
      setIsProcessing(false);
    }
  }

  function handleCloseModal() {
    setShowProcessModal(false);
  }

  return {
    showProcessModal,
    isProcessing,
    error,
    handleProcess,
    handleCloseModal
  };
}