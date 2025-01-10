import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Task } from '../lib/types';

export function useTasks(agentId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTasks() {
    if (!agentId) return;

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    setTasks(data || []);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTasks();
  }, [agentId]);

  return {
    tasks,
    isLoading,
    refreshTasks: fetchTasks
  };
}