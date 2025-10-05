import React, { useState } from 'react';
import { Task } from '../types';
import { Card } from './ui/Card';
import { SubtaskForm } from './SubtaskForm';
import { SubtaskList } from './SubtaskList';
import { theme } from '../styles/theme';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [showAddSubtask, setShowAddSubtask] = useState(false);

  const isSubtask = !!task.parentId;

  return (
    <Card
      variant="elevated"
      style={{
        margin: `${theme.spacing.sm} 0`,
        marginLeft: isSubtask ? theme.spacing.xl : 0,
        backgroundColor: isSubtask ? theme.colors.gray[100] : theme.colors.white,
        border: isSubtask ? `1px solid ${theme.colors.gray[300]}` : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: task.subtasks && task.subtasks.length > 0 ? theme.spacing.sm : 0,
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.dark,
            }}
          >
            {task.title}
          </h3>
        </div>
      </div>

      <SubtaskForm
        taskId={task.id}
        isVisible={showAddSubtask}
        onToggle={() => setShowAddSubtask(!showAddSubtask)}
        onSuccess={() => setShowAddSubtask(false)}
      />

      <SubtaskList
        subtasks={task.subtasks || []}
        isVisible={showSubtasks}
        onToggle={() => setShowSubtasks(!showSubtasks)}
      />
    </Card>
  );
};
