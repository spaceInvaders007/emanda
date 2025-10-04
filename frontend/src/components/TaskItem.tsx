import React, { useState } from 'react';
import { Task } from '../types';
import { useTasks } from '../context/TaskContext';

export const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [subtaskTitle, setSubtaskTitle] = useState('');
  const [showAddSubtask, setShowAddSubtask] = useState(false);
  const { addTask } = useTasks();

  const handleAddSubtask = () => {
    if (subtaskTitle.trim()) {
      addTask(subtaskTitle, task.id);
      setSubtaskTitle('');
      setShowAddSubtask(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSubtask();
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '0.75rem',
        margin: '0.5rem 0',
        backgroundColor: task.parentId ? '#f9f9f9' : '#fff',
        marginLeft: task.parentId ? '2rem' : '0',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <strong>{task.title}</strong>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setShowAddSubtask(!showAddSubtask)}
            style={{
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {showAddSubtask ? 'Cancel' : 'Add Subtask'}
          </button>
          {task.subtasks && task.subtasks.length > 0 && (
            <button
              onClick={() => setShowSubtasks(!showSubtasks)}
              style={{
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {showSubtasks ? 'Hide' : 'Show'} Subtasks ({task.subtasks.length})
            </button>
          )}
        </div>
      </div>

      {showAddSubtask && (
        <div
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #dee2e6',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="text"
              value={subtaskTitle}
              onChange={(e) => setSubtaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter subtask title..."
              style={{
                flex: 1,
                padding: '0.25rem 0.5rem',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '0.875rem',
              }}
            />
            <button
              onClick={handleAddSubtask}
              disabled={!subtaskTitle.trim()}
              style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                backgroundColor: subtaskTitle.trim() ? '#28a745' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: subtaskTitle.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {showSubtasks && task.subtasks && task.subtasks.length > 0 && (
        <div style={{ marginTop: '0.5rem' }}>
          {task.subtasks.map((subtask) => (
            <TaskItem key={subtask.id} task={subtask} />
          ))}
        </div>
      )}
    </div>
  );
};
