import { supabase } from '../supabase';
import type { PromptResult } from '../types';

export async function createPromptResult(promptId: string, content: string) {
  const { error } = await supabase
    .from('prompt_results')
    .insert([{ prompt_id: promptId, content }]);

  return { error };
}

export async function fetchPromptResults(promptId: string) {
  const { data, error } = await supabase
    .from('prompt_results')
    .select('*')
    .eq('prompt_id', promptId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching prompt results:', error);
    return [];
  }

  return data as PromptResult[];
}

export async function fetchPromptDetails(promptId: string) {
  const { data, error } = await supabase
    .from('prompts')
    .select(`
      id,
      content,
      task:task_id (
        id,
        name,
        agent:agent_id (
          id,
          name
        )
      )
    `)
    .eq('id', promptId)
    .single();

  if (error) {
    console.error('Error fetching prompt details:', error);
    return null;
  }

  return data;
}