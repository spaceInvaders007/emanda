import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

interface UseSubtaskFormProps {
  taskId: number;
  onSuccess?: () => void;
}

export const useSubtaskForm = ({ taskId, onSuccess }: UseSubtaskFormProps) => {
  const [subtaskTitle, setSubtaskTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addTask } = useTasks();

  const handleSubmit = async () => {
    if (!subtaskTitle.trim()) {
      setError('Subtask title is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addTask(subtaskTitle.trim(), taskId);
      setSubtaskTitle('');
      onSuccess?.();
    } catch (err) {
      setError('Failed to create subtask. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleSubmit();
    }
  };

  const reset = () => {
    setSubtaskTitle('');
    setError(null);
    setIsSubmitting(false);
  };

  return {
    subtaskTitle,
    setSubtaskTitle,
    isSubmitting,
    error,
    handleSubmit,
    handleKeyPress,
    reset,
    isValid: subtaskTitle.trim().length > 0,
  };
};
