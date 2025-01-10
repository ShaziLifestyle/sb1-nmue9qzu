import { supabase } from '../supabase';
import { withRetry } from '../utils/db';

export class DatabaseService {
  private static instance: DatabaseService;
  private batchSize = 5; // Process items in smaller batches

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!this.instance) {
      this.instance = new DatabaseService();
    }
    return this.instance;
  }

  async insertRecords<T extends Record<string, any>>(
    table: string,
    records: T[],
    options: {
      uniqueKey?: string;
      operationName: string;
    }
  ) {
    const { uniqueKey, operationName } = options;

    // If uniqueKey is provided, check for existing records
    if (uniqueKey) {
      const existingRecords = await this.fetchExistingRecords(table, uniqueKey, records);
      records = this.filterNewRecords(records, existingRecords, uniqueKey);
    }

    // Process in batches
    for (let i = 0; i < records.length; i += this.batchSize) {
      const batch = records.slice(i, i + this.batchSize);
      
      await withRetry(
        async () => {
          const { error } = await supabase
            .from(table)
            .insert(batch);

          if (error) throw error;
        },
        {
          operationName: `${operationName} (batch ${i / this.batchSize + 1})`,
          retries: 3,
          delay: 2000
        }
      );
    }
  }

  private async fetchExistingRecords<T extends Record<string, any>>(
    table: string,
    uniqueKey: string,
    records: T[]
  ) {
    const uniqueValues = records.map(record => record[uniqueKey]);
    
    const { data } = await supabase
      .from(table)
      .select(uniqueKey)
      .in(uniqueKey, uniqueValues);

    return data || [];
  }

  private filterNewRecords<T extends Record<string, any>>(
    records: T[],
    existingRecords: Record<string, any>[],
    uniqueKey: string
  ) {
    const existingValues = new Set(existingRecords.map(record => record[uniqueKey]));
    return records.filter(record => !existingValues.has(record[uniqueKey]));
  }
}