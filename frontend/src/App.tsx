import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskList } from './components/TaskList';
import { MainTaskForm } from './components/MainTaskForm';
import { theme } from './styles/theme';

const Main = () => {
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: theme.spacing.lg,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: theme.colors.gray[50],
        minHeight: '100vh',
      }}
    >
      <header
        style={{
          textAlign: 'center',
          marginBottom: theme.spacing.xl,
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.dark,
            margin: 0,
            marginBottom: theme.spacing.sm,
          }}
        >
          Task Manager
        </h1>
        <p
          style={{
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.gray[600],
            margin: 0,
          }}
        >
          Organize your tasks with unlimited subtask nesting
        </p>
      </header>

      <MainTaskForm />
      <TaskList />
    </div>
  );
};

const App = () => (
  <TaskProvider>
    <Main />
  </TaskProvider>
);

export default App;
