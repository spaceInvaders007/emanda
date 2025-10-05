import React, { useState } from 'react';
import { Task } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { SubtaskForm } from './SubtaskForm';
import { SubtaskList } from './SubtaskList';
import { useTasks } from '../context/TaskContext';
import { theme } from '../styles/theme';
import { MdDeleteOutline } from 'react-icons/md';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [showAddSubtask, setShowAddSubtask] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { removeTask } = useTasks();

  const isSubtask = !!task.parentId;

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}" and all its subtasks?`)) {
      setIsDeleting(true);
      try {
        await removeTask(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

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
        <div style={{ flex: 1 }}>
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
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.sm,
            alignItems: 'center',
          }}
        >
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              opacity: isDeleting ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '32px',
              height: '32px',
              padding: 0,
            }}
          >
            {isDeleting ? (
              <span style={{ fontSize: '12px' }}>...</span>
            ) : (
                  <MdDeleteOutline style={{ fontSize: '16px', color: 'white' }} />
            )}
          </Button>
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
