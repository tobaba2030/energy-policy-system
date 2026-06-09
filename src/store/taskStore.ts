import { create } from 'zustand';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  deadline?: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

interface TaskStore {
  projects: Project[];
  currentProjectId: string;
  tasks: Task[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  getTasksByProject: (projectId: string) => Task[];
}

const defaultProjects: Project[] = [
  {
    id: 'mesheer',
    name: 'mesheer',
    color: 'from-pink-500 to-rose-600',
    createdAt: new Date().toISOString(),
  },
  {
    id: '新项目',
    name: '新项目',
    color: 'from-blue-500 to-indigo-600',
    createdAt: new Date().toISOString(),
  },
];

const defaultTasks: Task[] = [
  {
    id: '1',
    title: '系统负载均衡优化',
    description: '优化区域电网负载分布，提高供电可靠性',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date().toISOString(),
    deadline: '2026-05-25',
    projectId: 'mesheer',
  },
  {
    id: '2',
    title: '新能源接入方案评审',
    description: '对新接入的光伏电站进行技术方案评审',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    deadline: '2026-05-28',
    projectId: 'mesheer',
  },
  {
    id: '3',
    title: '月度运行报告',
    description: '编写本月系统运行数据分析报告',
    status: 'completed',
    priority: 'low',
    createdAt: new Date().toISOString(),
    deadline: '2026-05-20',
    projectId: 'mesheer',
  },
  {
    id: '4',
    title: '数据库架构设计',
    description: '设计新系统的数据库架构，支持高并发访问',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date().toISOString(),
    deadline: '2026-05-30',
    projectId: '新项目',
  },
  {
    id: '5',
    title: 'API接口文档编写',
    description: '编写RESTful API接口文档和SDK使用指南',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    deadline: '2026-06-05',
    projectId: '新项目',
  },
  {
    id: '6',
    title: '用户权限系统',
    description: '实现基于RBAC的用户权限管理系统',
    status: 'pending',
    priority: 'high',
    createdAt: new Date().toISOString(),
    deadline: '2026-06-10',
    projectId: '新项目',
  },
];

export const useTaskStore = create<TaskStore>((set, get) => ({
  projects: defaultProjects,
  currentProjectId: 'mesheer',
  tasks: defaultTasks,
  
  addProject: (project) =>
    set((state) => ({
      projects: [
        ...state.projects,
        {
          ...project,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  
  deleteProject: (id) =>
    set((state) => {
      const remainingProjects = state.projects.filter((p) => p.id !== id);
      let newCurrentProjectId = state.currentProjectId;
      if (newCurrentProjectId === id && remainingProjects.length > 0) {
        newCurrentProjectId = remainingProjects[0].id;
      }
      return {
        projects: remainingProjects,
        currentProjectId: newCurrentProjectId,
        tasks: state.tasks.filter((t) => t.projectId !== id),
      };
    }),
  
  setCurrentProject: (id) =>
    set(() => ({
      currentProjectId: id,
    })),
  
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  
  toggleTaskStatus: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id !== id) return task;
        const statusOrder: TaskStatus[] = ['pending', 'in-progress', 'completed'];
        const currentIndex = statusOrder.indexOf(task.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        return { ...task, status: statusOrder[nextIndex] };
      }),
    })),
  
  getTasksByProject: (projectId) => {
    return get().tasks.filter((task) => task.projectId === projectId);
  },
}));
