// Predefined task data
export interface PredefinedTask {
  agentName: string;
  name: string;
  description: string;
}

export const predefinedTasks: PredefinedTask[] = [
  // Story Writer Agent Tasks
  {
    agentName: 'Story Writer Agent',
    name: 'Characters',
    description: 'Manage character names, backstories, and traits'
  },
  {
    agentName: 'Story Writer Agent',
    name: 'Music',
    description: 'Develop music themes for stories'
  },
  {
    agentName: 'Story Writer Agent',
    name: 'Sufi Story Wisdom',
    description: 'Integrate Sufi themes into stories'
  },
  {
    agentName: 'Story Writer Agent',
    name: 'Build World',
    description: 'Design the story\'s setting and environment'
  },
  // Marketing Agent Tasks
  {
    agentName: 'Marketing Agent',
    name: 'Profit First Task',
    description: 'Manage financial strategies'
  },
  {
    agentName: 'Marketing Agent',
    name: 'Instagram Marketing',
    description: 'Create posts for Instagram'
  },
  // Content Management Agent Tasks
  {
    agentName: 'Content Management Agent',
    name: 'Taglines',
    description: 'Generate product taglines'
  },
  {
    agentName: 'Content Management Agent',
    name: 'Product Descriptions',
    description: 'Write detailed product descriptions'
  },
  {
    agentName: 'Content Management Agent',
    name: 'Pricing',
    description: 'Suggest pricing strategies'
  },
  // Social Media Agent Tasks
  {
    agentName: 'Social Media Agent',
    name: 'Instagram Posts',
    description: 'Create engaging Instagram content'
  },
  {
    agentName: 'Social Media Agent',
    name: 'Suno Music AI Integration',
    description: 'Generate music-related promotional content'
  },
  {
    agentName: 'Social Media Agent',
    name: 'Recraft AI Integration',
    description: 'Design marketing visuals'
  }
];