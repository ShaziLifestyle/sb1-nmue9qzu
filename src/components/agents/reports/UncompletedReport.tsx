import React, { useEffect, useState } from 'react';
import { X, AlertTriangle, Bot, ListTodo, MessageSquare } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useEscapeKey } from '../../../hooks/useEscapeKey';

interface UncompletedReportProps {
  agentId: string;
  onClose: () => void;
}

export function UncompletedReport({ agentId, onClose }: UncompletedReportProps) {
  const [data, setData] = useState<any>(null);
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  useEscapeKey(onClose);

  useEffect(() => {
    async function fetchData() {
      const [agentData, tasksData] = await Promise.all([
        // Fetch agent details
        supabase
          .from('agents')
          .select('*')
          .eq('id', agentId)
          .single(),
        
        // Fetch tasks and prompts
        supabase
          .from('tasks')
          .select(`
            *,
            prompts (*)
          `)
          .eq('agent_id', agentId)
      ]);

      setData({
        agent: agentData.data,
        tasks: tasksData.data
      });
    }

    fetchData();
  }, [agentId]);

  if (!data) {
    return null;
  }

  const uncompletedFields = {
    agent: {
      name: !data.agent.name?.trim() || !data.agent.name_complete,
      role: !data.agent.role?.trim() || !data.agent.role_complete,
      description: !data.agent.description?.trim() || !data.agent.description_complete,
      goal: !data.agent.goal?.trim() || !data.agent.goal_complete,
      backstory: !data.agent.backstory?.trim() || !data.agent.backstory_complete
    },
    tasks: data.tasks?.map((task: any) => ({
      name: !task.name?.trim() || !task.name_complete,
      description: !task.description?.trim() || !task.description_complete,
      prompts: task.prompts?.map((prompt: any) => ({
        name: !prompt.name?.trim() || !prompt.name_complete,
        content: !prompt.content?.trim() || !prompt.content_complete
      }))
    }))
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 bg-amber-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-amber-800">Uncompleted Items Report</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-white/50"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-76px)] space-y-6">
          {/* Agent Section */}
          {Object.values(uncompletedFields.agent).some(Boolean) && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100 bg-amber-50/50">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-amber-600" />
                  <h4 className="text-lg font-semibold text-amber-800">Uncompleted Agent Fields</h4>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {uncompletedFields.agent.name && (
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Name</span>
                    {data.agent.name && <span className="text-amber-500">(needs to be marked as complete)</span>}
                  </div>
                )}
                {uncompletedFields.agent.role && (
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Role</span>
                    {data.agent.role && <span className="text-amber-500">(needs to be marked as complete)</span>}
                  </div>
                )}
                {uncompletedFields.agent.description && (
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Description</span>
                    {data.agent.description && <span className="text-amber-500">(needs to be marked as complete)</span>}
                  </div>
                )}
                {uncompletedFields.agent.goal && (
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Goal</span>
                    {data.agent.goal && <span className="text-amber-500">(needs to be marked as complete)</span>}
                  </div>
                )}
                {uncompletedFields.agent.backstory && (
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Backstory</span>
                    {data.agent.backstory && <span className="text-amber-500">(needs to be marked as complete)</span>}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tasks Section */}
          {uncompletedFields.tasks?.map((task: any, taskIndex: number) => {
            const taskData = data.tasks[taskIndex];
            const hasUncompletedFields = task.name || task.description || task.prompts?.some((p: any) => p.name || p.content);
            
            if (!hasUncompletedFields) return null;

            return (
              <div key={taskData.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100 bg-amber-50/50">
                  <div className="flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-amber-600" />
                    <h4 className="text-lg font-semibold text-amber-800">
                      Task: {taskData.name || 'Unnamed Task'}
                    </h4>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {task.name && (
                    <div className="flex items-center gap-2 text-amber-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-medium">Name</span>
                      {taskData.name && <span className="text-amber-500">(needs to be marked as complete)</span>}
                    </div>
                  )}
                  {task.description && (
                    <div className="flex items-center gap-2 text-amber-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-medium">Description</span>
                      {taskData.description && <span className="text-amber-500">(needs to be marked as complete)</span>}
                    </div>
                  )}
                  
                  {/* Prompts */}
                  {task.prompts?.some((p: any) => p.name || p.content) && (
                    <div className="mt-4 pl-6 border-l-2 border-amber-100">
                      <h5 className="text-sm font-medium text-amber-800 mb-3 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Uncompleted Prompts
                      </h5>
                      <div className="space-y-4">
                        {task.prompts.map((prompt: any, promptIndex: number) => {
                          const promptData = taskData.prompts[promptIndex];
                          if (!prompt.name && !prompt.content) return null;

                          return (
                            <div key={promptData.id} className="bg-amber-50/50 rounded-lg p-3 space-y-2">
                              {prompt.name && (
                                <div className="flex items-center gap-2 text-amber-600">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span className="font-medium">Name</span>
                                  {promptData.name && <span className="text-amber-500">(needs to be marked as complete)</span>}
                                </div>
                              )}
                              {prompt.content && (
                                <div className="flex items-center gap-2 text-amber-600">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span className="font-medium">Content</span>
                                  {promptData.content && <span className="text-amber-500">(needs to be marked as complete)</span>}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}