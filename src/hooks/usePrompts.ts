import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Prompt {
  id: string;
  content: string;
  task_id: string;
}

export function usePrompts(taskId: string | undefined) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchPrompts() {
    if (!taskId) return;

    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('task_id', taskId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching prompts:', error);
      return;
    }

    setPrompts(data || []);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPrompts();
  }, [taskId]);

  return {
    prompts,
    isLoading,
    refreshPrompts: fetchPrompts
  };
}