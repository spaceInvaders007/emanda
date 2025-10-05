import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Button } from './ui/Button';
import { theme } from '../styles/theme';
import { MdDeleteOutline } from 'react-icons/md';

export const ResetButton: React.FC = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { removeAllTasks, tasks } = useTasks();

  const handleReset = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => setIsConfirming(false), 3000);
      return;
    }

    setIsDeleting(true);
    try {
      await removeAllTasks();
      setIsConfirming(false);
    } catch (error) {
      console.error('Failed to delete all tasks:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  if (tasks.length === 0) {
    return null;
  }

  if (isConfirming) {
    return (
      <div
        style={{
          display: 'flex',
          gap: theme.spacing.sm,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.spacing.lg,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.danger + '10',
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${theme.colors.danger}30`,
        }}
      >
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.danger,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          Are you sure you want to delete all {tasks.length} tasks?
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleReset}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Yes, Delete All'}
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing.lg,
      }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={handleReset}
        disabled={isDeleting}
        style={{
          borderColor: theme.colors.danger,
          color: theme.colors.danger,
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.xs,
        }}
      >
                  <MdDeleteOutline style={{ fontSize: '16px' }} />
        Reset All Tasks
      </Button>
    </div>
  );
};
