import React, { useState } from 'react';
import { Plus, Folder, Trash2 } from 'lucide-react';
import { useTaskStore } from '@/store/taskStore';

const projectColors = [
  'from-pink-500 to-rose-600',
  'from-blue-500 to-indigo-600',
  'from-green-500 to-emerald-600',
  'from-orange-500 to-amber-600',
  'from-purple-500 to-violet-600',
  'from-cyan-500 to-teal-600',
];

const ProjectSelector: React.FC = () => {
  const { projects, currentProjectId, setCurrentProject, addProject, deleteProject } = useTaskStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      const randomColor = projectColors[Math.floor(Math.random() * projectColors.length)];
      const newProject = {
        name: newProjectName.trim(),
        color: randomColor,
      };
      addProject(newProject);
      setNewProjectName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">项目分组</h4>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-1 hover:bg-slate-700/50 rounded-lg transition-colors"
          title="新增项目"
        >
          <Plus className="w-4 h-4 text-slate-400 hover:text-white" />
        </button>
      </div>
      
      {isAdding && (
        <div className="mb-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="新项目名称"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-slate-800/80 border border-slate-600 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              autoFocus
            />
            <button
              onClick={handleAddProject}
              className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg text-xs font-medium transition-all"
            >
              添加
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewProjectName('');
              }}
              className="px-3 py-1.5 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-xs font-medium transition-all"
            >
              取消
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-1.5">
        {projects.map((project) => (
          <div key={project.id} className="group">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentProject(project.id)}
                className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentProjectId === project.id
                    ? 'bg-slate-700/80 border border-slate-600'
                    : 'hover:bg-slate-700/50'
                }`}
              >
                <div className={`w-5 h-5 bg-gradient-to-br ${project.color} rounded flex items-center justify-center`}>
                  <Folder className="w-3 h-3 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  currentProjectId === project.id ? 'text-white' : 'text-slate-300'
                }`}>
                  {project.name}
                </span>
              </button>
              {projects.length > 1 && (
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded-lg transition-all"
                  title="删除项目"
                >
                  <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-400" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSelector;
