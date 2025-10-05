import React, { useState } from 'react';
import { Task } from '../types';
import { Card, Modal } from './ui';
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { removeTask } = useTasks();

  const isSubtask = !!task.parentId;

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setShowDeleteModal(false);
    try {
      await removeTask(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
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
                onClick={handleDeleteClick}
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

        <Modal
          isOpen={showDeleteModal}
          onClose={handleDeleteCancel}
          title="Delete Task"
          size="sm"
        >
          <div style={{ marginBottom: '24px' }}>
            <p
              style={{
                margin: 0,
                marginBottom: '16px',
                fontSize: '16px',
                color: '#343a40',
                lineHeight: 1.5,
              }}
            >
              Are you sure you want to delete <strong>"{task.title}"</strong>?
            </p>
            {task.subtasks && task.subtasks.length > 0 && (
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#6c757d',
                  backgroundColor: '#f8f9fa',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #e9ecef',
                }}
              >
                ⚠️ This will also delete {task.subtasks.length} subtask{task.subtasks.length !== 1 ? 's' : ''}.
              </p>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Task'}
            </Button>
          </div>
        </Modal>
      </>
    );
  };
