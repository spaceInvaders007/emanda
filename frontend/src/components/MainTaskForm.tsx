import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { theme } from '../styles/theme';

export const MainTaskForm: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskTitle.trim()) {
      setError('Task title is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addTask(taskTitle.trim());
      setTaskTitle('');
    } catch (err) {
      setError('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleSubmit(e as any);
    }
  };

  return (
    <Card variant="elevated" style={{ marginBottom: theme.spacing.lg }}>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.sm,
            alignItems: 'flex-end',
          }}
        >
          <div style={{ flex: 1 }}>
            <Input
              label="Add New Task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter task title..."
              error={error || undefined}
              disabled={isSubmitting}
              helperText="Press Enter or click Add to create the task"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!taskTitle.trim() || isSubmitting}
            style={{ minWidth: '100px' }}
          >
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
