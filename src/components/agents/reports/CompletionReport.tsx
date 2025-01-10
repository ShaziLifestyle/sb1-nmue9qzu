import React, { useEffect, useState } from 'react';
import { X, Bot, Copy, CheckCircle2, FileDown, AlertTriangle, MessageSquare } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { supabase } from '../../../lib/supabase';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { useClipboard } from '../../../hooks/useClipboard';

interface CompletionReportProps {
  agentId: string;
  onClose: () => void;
}

export function CompletionReport({ agentId, onClose }: CompletionReportProps) {
  const [data, setData] = useState<any>(null);
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  const { copyToClipboard } = useClipboard();
  useEscapeKey(onClose);

  useEffect(() => {
    async function fetchData() {
      const [agentData, tasksData] = await Promise.all([
        supabase
          .from('agents')
          .select('*')
          .eq('id', agentId)
          .single(),
        
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

  if (!data) return null;

  // Check for exceptions
  const exceptions = {
    noTasks: !data.tasks?.length,
    noPrompts: data.tasks?.some((task: any) => !task.prompts?.length),
    incompleteAgent: {
      role: !data.agent.role?.trim() || !data.agent.role_complete,
      description: !data.agent.description?.trim() || !data.agent.description_complete,
      goal: !data.agent.goal?.trim() || !data.agent.goal_complete,
      backstory: !data.agent.backstory?.trim() || !data.agent.backstory_complete
    },
    incompleteTasks: data.tasks?.map((task: any) => ({
      description: task.description && (!task.description?.trim() || !task.description_complete),
      noPrompts: !task.prompts?.length,
      incompletePrompts: task.prompts?.map((prompt: any) => ({
        content: !prompt.content?.trim() || !prompt.content_complete
      }))
    }))
  };

  const hasExceptions = exceptions.noTasks || 
    exceptions.noPrompts || 
    Object.values(exceptions.incompleteAgent).some(Boolean) ||
    exceptions.incompleteTasks?.some((task: any) => 
      task.description || task.noPrompts || 
      task.incompletePrompts?.some((p: any) => p.content)
    );

  function generateReport() {
    let report = `COMPLETION REPORT\n\n`;
    report += `Agent: ${data.agent.name}\n`;
    report += `Status: ${!hasExceptions ? 'COMPLETE' : 'INCOMPLETE'}\n\n`;

    // Exceptions Section
    if (hasExceptions) {
      report += `=== EXCEPTIONS ===\n`;
      if (exceptions.noTasks) {
        report += `- No tasks found for this agent\n`;
      }
      if (exceptions.noPrompts) {
        report += `- Some tasks have no prompts\n`;
      }
      
      // Agent Exceptions
      const incompleteAgentFields = Object.entries(exceptions.incompleteAgent)
        .filter(([_, incomplete]) => incomplete)
        .map(([field]) => field);
      
      if (incompleteAgentFields.length) {
        report += `- Incomplete agent fields: ${incompleteAgentFields.join(', ')}\n`;
      }

      // Task Exceptions
      data.tasks?.forEach((task: any, index: number) => {
        const taskExceptions = exceptions.incompleteTasks[index];
        if (taskExceptions.description || taskExceptions.noPrompts) {
          report += `\nTask "${task.name}":\n`;
          if (taskExceptions.description) report += `  - Description is incomplete\n`;
          if (taskExceptions.noPrompts) report += `  - No prompts found\n`;
          
          taskExceptions.incompletePrompts?.forEach((prompt: any, promptIndex: number) => {
            if (prompt.content) {
              report += `  Prompt ${promptIndex + 1}:\n`;
              if (prompt.content) report += `    - Content is incomplete\n`;
            }
          });
        }
      });
      
      report += `\n`;
    }

    // Regular Report Content
    report += `=== AGENT DETAILS ===\n`;
    report += `Name: ${data.agent.name}\n`;
    if (data.agent.role) report += `Role: ${data.agent.role}\n`;
    if (data.agent.description) report += `Description: ${data.agent.description}\n`;
    if (data.agent.goal) report += `Goal: ${data.agent.goal}\n`;
    if (data.agent.backstory) report += `Backstory: ${data.agent.backstory}\n`;

    if (data.tasks?.length) {
      report += `\n=== TASKS ===\n`;
      data.tasks.forEach((task: any, index: number) => {
        report += `\nTask ${index + 1}: ${task.name}\n`;
        if (task.description) {
          report += `Description: ${task.description}\n`;
        }

        if (task.prompts?.length) {
          report += `Prompts:\n`;
          task.prompts.forEach((prompt: any, promptIndex: number) => {
            report += `  ${promptIndex + 1}. ${prompt.name}\n`;
            report += `     ${prompt.content}\n`;
          });
        }
      });
    }

    return report;
  }

  function downloadPDF() {
    const doc = new jsPDF();
    const report = generateReport();
    const lines = doc.splitTextToSize(report, 180);
    doc.text(lines, 15, 15);
    doc.save(`completion-report-${data.agent.name}.pdf`);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
      >
        <div className={`p-6 border-b border-gray-200 ${hasExceptions ? 'bg-amber-50' : 'bg-green-50'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${hasExceptions ? 'bg-amber-100' : 'bg-green-100'}`}>
                {hasExceptions ? (
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                )}
              </div>
              <h3 className={`text-2xl font-bold ${hasExceptions ? 'text-amber-800' : 'text-green-800'}`}>
                Completion Report
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(generateReport())}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-white/50"
                title="Copy report"
              >
                <Copy size={20} />
              </button>
              <button
                onClick={downloadPDF}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-white/50"
                title="Download PDF"
              >
                <FileDown size={20} />
              </button>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-white/50"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-76px)] space-y-6">
          {/* Exceptions Section */}
          {hasExceptions && (
            <div className="bg-red-50 rounded-xl p-6 border border-red-100">
              <h4 className="text-lg font-semibold text-red-800 mb-4">Exceptions Found</h4>
              <div className="space-y-3">
                {exceptions.noTasks && (
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="w-4 h-4" />
                    <span>No tasks found for this agent</span>
                  </div>
                )}
                {exceptions.noPrompts && (
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Some tasks have no prompts</span>
                  </div>
                )}
                {Object.entries(exceptions.incompleteAgent).map(([field, incomplete]) => 
                  incomplete && (
                    <div key={field} className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Agent {field} is incomplete</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Regular Report Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-gray-600" />
                <h4 className="text-lg font-semibold text-gray-800">Report Content</h4>
              </div>
            </div>
            <div className="p-4">
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-gray-800">
                {generateReport()}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}