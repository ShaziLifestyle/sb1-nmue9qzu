import type { Agent } from '../types';

export const predefinedAgents: Partial<Agent>[] = [
  {
    name: 'Story Writer Agent',
    description: 'AI agent specialized in creative writing, storytelling, and narrative development',
    order: 1
  },
  {
    name: 'Marketing Agent',
    description: 'Expert in digital marketing strategies, campaign planning, and market analysis',
    order: 2
  },
  {
    name: 'Content Management Agent',
    description: 'Manages content creation, organization, and distribution across platforms',
    order: 3
  },
  {
    name: 'Social Media Agent',
    description: 'Handles social media strategy, engagement, and community management',
    order: 4
  }
];