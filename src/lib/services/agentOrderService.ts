import { supabase } from '../supabase';
import { getNextOrder } from '../api/agentApi';

export async function initializeAgentOrders() {
  const { data: agents } = await supabase
    .from('agents')
    .select('id, created_at, order')
    .order('created_at', { ascending: true });

  if (!agents?.length) return;

  const nextOrder = await getNextOrder();
  
  // Update agents without order
  for (let i = 0; i < agents.length; i++) {
    if (!agents[i].order) {
      await supabase
        .from('agents')
        .update({ order: nextOrder + i })
        .eq('id', agents[i].id);
    }
  }
}