import { SupabaseClient } from '@supabase/supabase-js';

// Generic database operation with retry logic
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    operationName: string;
  } = { retries: 3, delay: 1000, operationName: 'database operation' }
): Promise<T | null> {
  const { retries = 3, delay = 1000, operationName } = options;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const result = await operation();
      return result;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed for ${operationName}:`, error);
      
      if (attempt === retries - 1) {
        console.error(`All ${retries} attempts failed for ${operationName}`);
        return null;
      }
      
      await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)));
    }
  }
  return null;
}