import React from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskItem } from './TaskItem';
import { Card } from './ui/Card';
import { theme } from '../styles/theme';

export const TaskList: React.FC = () => {
  const { tasks } = useTasks();
  const topLevelTasks = tasks.filter(task => !task.parentId);

  if (topLevelTasks.length === 0) {
    return (
      <Card
        variant="outlined"
        style={{
          textAlign: 'center',
          padding: theme.spacing.xl,
          backgroundColor: theme.colors.white,
        }}
      >
        <div
          style={{
            fontSize: '3rem',
            marginBottom: theme.spacing.md,
            color: theme.colors.gray[400],
          }}
        >
          📝
        </div>
        <h3
          style={{
            margin: 0,
            marginBottom: theme.spacing.sm,
            color: theme.colors.gray[700],
            fontSize: theme.typography.fontSize.lg,
          }}
        >
          No tasks yet
        </h3>
        <p
          style={{
            margin: 0,
            color: theme.colors.gray[600],
            fontSize: theme.typography.fontSize.sm,
          }}
        >
          Create your first task using the form above
        </p>
      </Card>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.lg,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.dark,
          }}
        >
          Your Tasks
        </h2>
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.gray[600],
            backgroundColor: theme.colors.gray[200],
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            borderRadius: theme.borderRadius.sm,
          }}
        >
          {topLevelTasks.length} task{topLevelTasks.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div>
        {topLevelTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
