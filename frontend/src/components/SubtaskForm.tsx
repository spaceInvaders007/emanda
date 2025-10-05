import React from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { useSubtaskForm } from '../hooks/useSubtaskForm';
import { theme } from '../styles/theme';

interface SubtaskFormProps {
  taskId: number;
  isVisible: boolean;
  onToggle: () => void;
  onSuccess?: () => void;
}

export const SubtaskForm: React.FC<SubtaskFormProps> = ({
  taskId,
  isVisible,
  onToggle,
  onSuccess,
}) => {
  const {
    subtaskTitle,
    setSubtaskTitle,
    isSubmitting,
    error,
    handleSubmit,
    handleKeyPress,
    isValid,
  } = useSubtaskForm({ taskId, onSuccess });

  if (!isVisible) {
    return (
      <Button
        variant="primary"
        size="sm"
        onClick={onToggle}
        style={{ marginTop: theme.spacing.sm }}
      >
        Add Subtask
      </Button>
    );
  }

  return (
    <Card
      variant="outlined"
      padding="sm"
      style={{
        marginTop: theme.spacing.sm,
        backgroundColor: theme.colors.gray[100],
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <div 
        style={{ 
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div 
          style={{ 
            marginBottom: theme.spacing.sm,
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Input
            value={subtaskTitle}
            onChange={(e) => setSubtaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter subtask title..."
            error={error || undefined}
            disabled={isSubmitting}
            style={{
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.sm,
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={onToggle}
            disabled={isSubmitting}
            style={{ minWidth: '80px', flexShrink: 0 }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            style={{ minWidth: '80px', flexShrink: 0 }}
          >
            {isSubmitting ? 'Adding...' : 'Add Subtask'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
