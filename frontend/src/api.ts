import axios from 'axios';
import { Task } from './types';

const API_BASE = '/api/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API_BASE);
  return Array.isArray(res.data) ? res.data : [];
};

export const createTask = async (
  title: string,
  parentId?: number
): Promise<Task> => {
  const res = await axios.post(API_BASE, { title, parentId });
  return res.data;
};

export const fetchSubtasks = async (parentId: number): Promise<Task[]> => {
  const res = await axios.get(`${API_BASE}/${parentId}/subtasks`);
  return Array.isArray(res.data) ? res.data : [];
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/${id}`);
};

export const deleteAllTasks = async (): Promise<{ message: string; deletedCount: number }> => {
  const res = await axios.delete(API_BASE);
  return res.data;
};
