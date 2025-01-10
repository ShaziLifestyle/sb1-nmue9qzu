import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Agent } from '../lib/types';

export function usePromptResult(agent: Agent) {
  const [showPromptResultModal, setShowPromptResultModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSavePromptResult(result: string) {
    try {
      setError(null);
      
      const { error: updateError } = await supabase
        .from('agents')
        .update({ prompt_result: result })
        .eq('id', agent.id);

      if (updateError) throw updateError;
      
      // Update local state
      agent.prompt_result = result;
      setShowPromptResultModal(false);
    } catch (err) {
      console.error('Failed to save prompt result:', err);
      setError('Failed to save prompt result');
    }
  }

  function handlePromptResultClick() {
    setShowPromptResultModal(true);
  }

  function handleClosePromptResultModal() {
    setShowPromptResultModal(false);
  }

  return {
    showPromptResultModal,
    error,
    handlePromptResultClick,
    handleClosePromptResultModal,
    handleSavePromptResult
  };
}