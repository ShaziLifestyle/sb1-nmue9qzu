import { DatabaseService } from './databaseService';
import { predefinedAgents } from '../data/agents';
import { predefinedTasks } from '../data/tasks';
import { predefinedPrompts } from '../data/prompts';
import { supabase } from '../supabase';

export class SeedingService {
  private static instance: SeedingService;
  private dbService: DatabaseService;

  private constructor() {
    this.dbService = DatabaseService.getInstance();
  }

  static getInstance(): SeedingService {
    if (!this.instance) {
      this.instance = new SeedingService();
    }
    return this.instance;
  }

  async seedAll() {
    try {
      console.log('Starting seeding process...');
      
      // Step 1: Seed agents
      const agents = await this.seedAgents();
      if (!agents?.length) {
        console.log('No new agents to seed');
        return;
      }

      // Step 2: Seed tasks
      await this.seedTasks(agents);

      // Step 3: Seed prompts
      await this.seedPrompts();

      console.log('Seeding completed successfully');
    } catch (error) {
      console.error('Fatal error during seeding:', error);
    }
  }

  private async seedAgents() {
    const { data: agents } = await supabase
      .from('agents')
      .select('id, name, description, role, goal, backstory, order');

    if (agents?.length === predefinedAgents.length) {
      return agents;
    }

    await this.dbService.insertRecords('agents', predefinedAgents, {
      uniqueKey: 'name',
      operationName: 'seeding agents'
    });

    const { data: newAgents } = await supabase
      .from('agents')
      .select('id, name, description, role, goal, backstory, order');

    return newAgents;
  }

  private async seedTasks(agents: any[]) {
    const tasksToInsert = agents.flatMap(agent => {
      const agentTasks = predefinedTasks.filter(task => task.agentName === agent.name);
      return agentTasks.map(({ agentName, ...task }) => ({
        ...task,
        agent_id: agent.id
      }));
    });

    await this.dbService.insertRecords('tasks', tasksToInsert, {
      uniqueKey: 'name',
      operationName: 'seeding tasks'
    });
  }

  private async seedPrompts() {
    const { data: tasks } = await supabase
      .from('tasks')
      .select('*');

    if (!tasks?.length) return;

    const promptsToInsert = tasks.flatMap(task => {
      const taskPrompts = predefinedPrompts.filter(prompt => prompt.taskName === task.name);
      return taskPrompts.map(({ taskName, ...prompt }) => ({
        ...prompt,
        task_id: task.id
      }));
    });

    await this.dbService.insertRecords('prompts', promptsToInsert, {
      uniqueKey: 'content',
      operationName: 'seeding prompts'
    });
  }
}