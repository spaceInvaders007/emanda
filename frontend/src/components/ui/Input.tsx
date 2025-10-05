import React from 'react';
import { theme } from '../../styles/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  style,
  ...props
}) => {
  const inputStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '100%',
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    border: `1px solid ${error ? theme.colors.danger : theme.colors.gray[400]}`,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.sm,
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const focusStyles: React.CSSProperties = {
    borderColor: theme.colors.primary,
    boxShadow: `0 0 0 2px ${theme.colors.primary}20`,
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: theme.spacing.xs,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.dark,
          }}
        >
          {label}
        </label>
      )}
      <input
        style={{
          ...inputStyles,
          ...style,
        }}
        className={className}
        onFocus={(e) => {
          Object.assign(e.currentTarget.style, focusStyles);
        }}
        onBlur={(e) => {
          Object.assign(e.currentTarget.style, {
            borderColor: error ? theme.colors.danger : theme.colors.gray[400],
            boxShadow: 'none',
          });
        }}
        {...props}
      />
      {error && (
        <div
          style={{
            marginTop: theme.spacing.xs,
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.danger,
          }}
        >
          {error}
        </div>
      )}
      {helperText && !error && (
        <div
          style={{
            marginTop: theme.spacing.xs,
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.gray[600],
          }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};
