import React from 'react';
import { theme } from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  style,
}) => {
  const baseStyles: React.CSSProperties = {
    borderRadius: theme.borderRadius.md,
    transition: 'all 0.2s ease-in-out',
  };

  const variantStyles: Record<CardProps['variant'], React.CSSProperties> = {
    default: {
      backgroundColor: theme.colors.white,
      border: `1px solid ${theme.colors.gray[300]}`,
    },
    elevated: {
      backgroundColor: theme.colors.white,
      boxShadow: theme.shadows.md,
      border: 'none',
    },
    outlined: {
      backgroundColor: 'transparent',
      border: `2px solid ${theme.colors.gray[300]}`,
    },
  };

  const paddingStyles: Record<CardProps['padding'], React.CSSProperties> = {
    sm: { padding: theme.spacing.sm },
    md: { padding: theme.spacing.md },
    lg: { padding: theme.spacing.lg },
  };

  return (
    <div
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...paddingStyles[padding],
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
