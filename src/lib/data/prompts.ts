// Predefined prompt data
export interface PredefinedPrompt {
  taskName: string;
  content: string;
}

export const predefinedPrompts: PredefinedPrompt[] = [
  // Story Writer Agent Prompts
  {
    taskName: 'Characters',
    content: 'Generate 5 unique character names with backstories for a fantasy novel.'
  },
  {
    taskName: 'Music',
    content: 'Create 3 instrumental music pieces inspired by Celtic and Arabic styles.'
  },
  {
    taskName: 'Sufi Story Wisdom',
    content: 'Suggest 5 Sufi wisdom quotes for a story with a theme of oneness with nature.'
  },
  {
    taskName: 'Build World',
    content: 'Create a map for a magical village inspired by Oakville, Canada.'
  },
  // Marketing Agent Prompts
  {
    taskName: 'Profit First Task',
    content: 'Develop a Shopify pricing strategy following Profit First principles.'
  },
  {
    taskName: 'Instagram Marketing',
    content: 'Write 5 catchy taglines for Instagram posts promoting inspirational T-shirts.'
  },
  // Content Management Agent Prompts
  {
    taskName: 'Taglines',
    content: 'Generate 10 taglines for T-shirts with inspirational quotes.'
  },
  {
    taskName: 'Product Descriptions',
    content: 'Write a 150-word description for a T-shirt featuring a quote on resilience.'
  },
  {
    taskName: 'Pricing',
    content: 'Provide a dynamic pricing model for Shopify based on seasonal trends.'
  },
  // Social Media Agent Prompts
  {
    taskName: 'Instagram Posts',
    content: 'Suggest 5 post ideas with hashtags for promoting inspirational quotes T-shirts.'
  },
  {
    taskName: 'Suno Music AI Integration',
    content: 'Create 3 Instagram reels with Celtic/Arabic instrumental backgrounds for T-shirt promotions.'
  },
  {
    taskName: 'Recraft AI Integration',
    content: 'Generate 5 visual concepts for T-shirts using inspirational quotes.'
  }
];