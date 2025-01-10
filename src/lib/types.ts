export interface Agent {
  id: string;
  name: string;
  description?: string;
  role?: string;
  goal?: string;
  backstory?: string;
  order?: number;
  agent_process?: string;
  prompt_result?: string;
  name_complete: boolean;
  role_complete: boolean;
  description_complete: boolean;
  goal_complete: boolean;
  backstory_complete: boolean;
  complete?: boolean;
  created_at?: string;
}

export interface Task {
  id: string;
  agent_id: string;
  name: string;
  description?: string;
  name_complete: boolean;
  description_complete: boolean;
  complete?: boolean;
  created_at?: string;
}

export interface Prompt {
  id: string;
  task_id: string;
  name: string;
  content: string;
  name_complete: boolean;
  content_complete: boolean;
  complete?: boolean;
  created_at?: string;
}