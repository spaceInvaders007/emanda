import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../types';
import { fetchTasks, createTask } from '../api';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, parentId?: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const addTask = async (title: string, parentId?: number) => {
    await createTask(title, parentId);
    fetchTasks().then(setTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};
