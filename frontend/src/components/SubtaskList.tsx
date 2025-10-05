import React from 'react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';
import { theme } from '../styles/theme';

interface SubtaskListProps {
  subtasks: Task[];
  isVisible: boolean;
  onToggle: () => void;
}

export const SubtaskList: React.FC<SubtaskListProps> = ({
  subtasks,
  isVisible,
  onToggle,
}) => {
  if (!subtasks || subtasks.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: theme.spacing.sm }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          marginBottom: theme.spacing.sm,
        }}
      >
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: theme.spacing.xs,
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.gray[600],
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.xs,
            transition: 'background-color 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.gray[200];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <span
            style={{
              transform: isVisible ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out',
              fontSize: '0.8em',
            }}
          >
            ▶
          </span>
          <span>
            {isVisible ? 'Hide' : 'Show'} Subtasks ({subtasks.length})
          </span>
        </button>
      </div>

      {isVisible && (
        <div
          style={{
            marginLeft: theme.spacing.lg,
            borderLeft: `2px solid ${theme.colors.gray[300]}`,
            paddingLeft: theme.spacing.md,
          }}
        >
          {subtasks.map((subtask) => (
            <TaskItem key={subtask.id} task={subtask} />
          ))}
        </div>
      )}
    </div>
  );
};
