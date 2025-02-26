import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { todoApi } from './api/todoApi';
import { Todo, CreateTodoRequest } from './types/todo';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { TodoDetailsDialog } from './components/TodoDetailsDialog';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const fetchedTodos = await todoApi.getAllTodos();
      setTodos(fetchedTodos);
      setError(null);
    } catch (err) {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todo: CreateTodoRequest) => {
    try {
      const newTodo = await todoApi.createTodo(todo);
      setTodos([...todos, newTodo]);
      setError(null);
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      const updatedTodo = await todoApi.updateTodo(todo.id, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map(t => t.id === todo.id ? updatedTodo : t));
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      const result = await todoApi.updateTodo(updatedTodo.id, updatedTodo);
      setTodos(todos.map(t => t.id === updatedTodo.id ? result : t));
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
      throw err;
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo App
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <AddTodoForm onAdd={handleAddTodo} />
        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={setSelectedTodo}
        />

        <TodoDetailsDialog
          todo={selectedTodo}
          open={selectedTodo !== null}
          onClose={() => setSelectedTodo(null)}
          onSave={handleUpdateTodo}
        />
      </Box>
    </Container>
  );
}

export default App;
