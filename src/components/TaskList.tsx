import React, { useState } from 'react';
import { CheckCircle2, Clock, AlertCircle, Plus, Trash2, Edit2 } from 'lucide-react';
import { useTaskStore, type Task, type TaskStatus } from '@/store/taskStore';
import ProjectSelector from './ProjectSelector';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const TaskList: React.FC = () => {
  const { currentProjectId, getTasksByProject, toggleTaskStatus, deleteTask, addTask } = useTaskStore();
  const tasks = getTasksByProject(currentProjectId);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    deadline: '',
  });

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return CheckCircle2;
      case 'in-progress':
        return Clock;
      case 'pending':
        return AlertCircle;
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-600';
      case 'in-progress':
        return 'from-blue-500 to-cyan-600';
      case 'pending':
        return 'from-orange-500 to-amber-600';
    }
  };

  const getStatusBg = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return 'from-green-500/20 to-emerald-600/20';
      case 'in-progress':
        return 'from-blue-500/20 to-cyan-600/20';
      case 'pending':
        return 'from-orange-500/20 to-amber-600/20';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getStatusText = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in-progress':
        return '进行中';
      case 'pending':
        return '待开始';
    }
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask({
        ...newTask,
        status: 'pending',
        projectId: currentProjectId,
      });
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        deadline: '',
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          任务列表
        </h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-lg text-xs font-medium shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          {isAdding ? '取消' : '新增'}
        </button>
      </div>

      <ProjectSelector />

      {isAdding && (
        <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600 p-4 mb-3">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="任务标题"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50"
            />
            <textarea
              placeholder="任务描述"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 resize-none h-20"
            />
            <div className="flex gap-2">
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                className="flex-1 px-3 py-2 bg-slate-800/80 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50"
              >
                <option value="low">低优先级</option>
                <option value="medium">中优先级</option>
                <option value="high">高优先级</option>
              </select>
              <input
                type="date"
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                className="flex-1 px-3 py-2 bg-slate-800/80 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddTask}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all"
              >
                确认添加
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewTask({
                    title: '',
                    description: '',
                    priority: 'medium',
                    deadline: '',
                  });
                }}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm font-medium transition-all"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-3">
        {tasks.map((task) => {
          const StatusIcon = getStatusIcon(task.status);
          return (
            <div
              key={task.id}
              className={cn(
                'bg-gradient-to-br rounded-xl p-3 shadow-lg border hover:shadow-xl transition-all duration-200 group',
                getStatusBg(task.status),
                'border-slate-700/50 hover:border-slate-600'
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2 flex-1">
                  <div
                    className={cn(
                      'w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center flex-shrink-0',
                      getStatusColor(task.status)
                    )}
                  >
                    <StatusIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4
                        className={cn(
                          'font-bold text-sm text-white',
                          task.status === 'completed' && 'line-through opacity-70'
                        )}
                      >
                        {task.title}
                      </h4>
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded text-xs font-medium border',
                          getPriorityColor(task.priority)
                        )}
                      >
                        {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                      </span>
                    </div>
                    <p
                      className={cn(
                        'text-xs text-slate-300 mb-2',
                        task.status === 'completed' && 'line-through opacity-70'
                      )}
                    >
                      {task.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <span className={cn('w-1.5 h-1.5 rounded-full', task.status === 'completed' ? 'bg-green-400' : task.status === 'in-progress' ? 'bg-blue-400' : 'bg-orange-400')} />
                        {getStatusText(task.status)}
                      </span>
                      {task.deadline && (
                        <span className="text-xs text-slate-400">
                          截止: {task.deadline}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors"
                    title="切换状态"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors"
                    title="删除"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
