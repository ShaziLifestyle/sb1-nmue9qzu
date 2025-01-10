import { supabase } from '../supabase';
import type { Agent } from '../types';

export async function fetchAgent(id: string) {
  const { data, error } = await supabase
    .from('agents')
    .select('id, name, role, description, goal, backstory')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching agent:', error);
    return null;
  }

  return data as Agent;
}

export async function fetchAgents() {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching agents:', error);
    return [];
  }

  return data as Agent[];
}

export async function getNextOrder(): Promise<number> {
  const { data } = await supabase
    .from('agents')
    .select('order')
    .order('order', { ascending: false })
    .limit(1);

  return (data?.[0]?.order || 0) + 1;
}

export async function createAgent(agent: Partial<Agent>) {
  const nextOrder = await getNextOrder();
  
  const { error } = await supabase
    .from('agents')
    .insert([{ 
      ...agent, 
      order: agent.order || nextOrder
    }]);

  return { error };
}

export async function updateAgent(id: string, updates: Partial<Agent>) {
  const { error } = await supabase
    .from('agents')
    .update(updates)
    .eq('id', id);

  return { error };
}

export async function deleteAgent(id: string) {
  const { error } = await supabase
    .from('agents')
    .delete()
    .eq('id', id);

  return { error };
}

export async function updateAgentOrder(id: string, newOrder: number) {
  const { error } = await supabase
    .from('agents')
    .update({ order: newOrder })
    .eq('id', id);

  return { error };
}