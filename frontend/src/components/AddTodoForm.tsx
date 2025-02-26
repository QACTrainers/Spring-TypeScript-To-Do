import React, { useState } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { CreateTodoRequest } from '../types/todo';

interface AddTodoFormProps {
  onAdd: (todo: CreateTodoRequest) => Promise<void>;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [newTodoText, setNewTodoText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    await onAdd({ text: newTodoText });
    setNewTodoText('');
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new todo"
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            disabled={!newTodoText.trim()}
          >
            Add
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
