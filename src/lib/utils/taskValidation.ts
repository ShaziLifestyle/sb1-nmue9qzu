import { supabase } from '../supabase';

export async function isTaskNameUnique(name: string, agentId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('tasks')
    .select('id')
    .eq('agent_id', agentId)
    .ilike('name', name)
    .limit(1);

  if (error) {
    console.error('Error checking task name uniqueness:', error);
    return false;
  }

  return !data || data.length === 0;
}