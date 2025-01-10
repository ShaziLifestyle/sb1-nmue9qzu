import { SeedingService } from './services/seedingService';
import { initializeAgentOrders } from './services/agentOrderService';
import { supabase } from './supabase';

export async function seedAllData() {
  const seedingService = SeedingService.getInstance();
  await seedingService.seedAll();
  await initializeAgentOrders();
}