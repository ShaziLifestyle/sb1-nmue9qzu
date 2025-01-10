import { Agent } from '../types';
import { supabase } from '../supabase';

export async function generateAgentProcess(agent: Agent): Promise<string> {
  try {
    // Fetch tasks and prompts in a single query
    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select(`
        id,
        name,
        description,
        prompts (
          id,
          content,
          created_at
        )
      `)
      .eq('agent_id', agent.id)
      .order('created_at', { ascending: true });

    if (tasksError) {
      console.error('Error fetching tasks:', tasksError);
      throw tasksError;
    }

    // Build the process text with clear section formatting
    const sections = [
      `=== ${agent.name.toUpperCase()} ===`,
      '',
      agent.role ? `Role:\n${agent.role}` : null,
      agent.description ? `Description:\n${agent.description}` : null,
      agent.goal ? `Goal:\n${agent.goal}` : null,
      agent.backstory ? `Backstory:\n${agent.backstory}` : null,
      '',
      tasks?.length ? '=== TASKS ===' : null,
      ''
    ].filter(Boolean);

    if (tasks?.length) {
      tasks.forEach((task: any, index: number) => {
        sections.push(`[Task ${index + 1}]: ${task.name}`);
        if (task.description) {
          sections.push(`Description: ${task.description}`);
        }
        
        if (task.prompts?.length) {
          sections.push('\nPrompts:');
          task.prompts
            .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
            .forEach((prompt: any, promptIndex: number) => {
              sections.push(`${promptIndex + 1}. ${prompt.content}`);
            });
        }
        sections.push(''); // Add spacing between tasks
      });
    }

    return sections.join('\n');
  } catch (error) {
    console.error('Error generating agent process:', error);
    throw error;
  }
}

export async function updateAgentProcess(agent: Agent): Promise<void> {
  try {
    const processText = await generateAgentProcess(agent);
    
    const { error: updateError } = await supabase
      .from('agents')
      .update({ agent_process: processText })
      .eq('id', agent.id);

    if (updateError) {
      console.error('Error updating agent process:', updateError);
      throw updateError;
    }

    // Update the local agent object
    agent.agent_process = processText;
  } catch (error) {
    console.error('Error in updateAgentProcess:', error);
    throw error;
  }
}