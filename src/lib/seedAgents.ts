import { supabase } from './supabase';

interface PredefinedAgent {
  name: string;
  description: string;
}

const predefinedAgents: PredefinedAgent[] = [
  {
    name: 'Story Writer Agent',
    description: 'AI agent specialized in creative writing, storytelling, and narrative development'
  },
  {
    name: 'Marketing Agent',
    description: 'Expert in digital marketing strategies, campaign planning, and market analysis'
  },
  {
    name: 'Finance Agent',
    description: 'Specialized in financial analysis, budgeting, and investment strategies'
  },
  {
    name: 'Content Management Agent',
    description: 'Manages content creation, organization, and distribution across platforms'
  },
  {
    name: 'Social Media Agent',
    description: 'Handles social media strategy, engagement, and community management'
  }
];

export async function seedInitialAgents() {
  try {
    const { data: existingAgents } = await supabase
      .from('agents')
      .select('name');

    const existingNames = new Set(existingAgents?.map(agent => agent.name) || []);
    const newAgents = predefinedAgents.filter(agent => !existingNames.has(agent.name));

    if (newAgents.length > 0) {
      const { error } = await supabase
        .from('agents')
        .insert(newAgents);

      if (error) {
        console.error('Error seeding agents:', error);
      }
    }
  } catch (error) {
    console.error('Error in seedInitialAgents:', error);
  }
}