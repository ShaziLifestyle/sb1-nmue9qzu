import { supabase } from '../supabase';
import type { Task } from '../types';

export async function fetchTasks(agentId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }

  return data as Task[];
}

export async function createTask(task: { name: string; description: string; agent_id: string }) {
  const { error } = await supabase
    .from('tasks')
    .insert([task]);

  return { error };
}

export async function updateTask(id: string, updates: Partial<Task>) {
  const { error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id);

  return { error };
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  return { error };
}