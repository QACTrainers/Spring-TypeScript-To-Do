import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Todo } from '../types/todo';

interface TodoDetailsDialogProps {
  todo: Todo | null;
  open: boolean;
  onClose: () => void;
  onSave: (todo: Todo) => Promise<void>;
}

export const TodoDetailsDialog: React.FC<TodoDetailsDialogProps> = ({
  todo,
  open,
  onClose,
  onSave,
}) => {
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const [newSubtask, setNewSubtask] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset form when dialog opens with new todo
  React.useEffect(() => {
    setEditedTodo(todo ? { ...todo } : null);
    setNewSubtask('');
  }, [todo]);

  if (!editedTodo) return null;

  const handleSave = async () => {
    if (!editedTodo) return;
    setLoading(true);
    try {
      await onSave(editedTodo);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtask.trim() || !editedTodo) return;

    setEditedTodo({
      ...editedTodo,
      subtasks: [...editedTodo.subtasks, newSubtask.trim()],
    });
    setNewSubtask('');
  };

  const handleRemoveSubtask = (index: number) => {
    if (!editedTodo) return;

    setEditedTodo({
      ...editedTodo,
      subtasks: editedTodo.subtasks.filter((_, i) => i !== index),
    });
  };

  const handleDueDateChange = (newDate: dayjs.Dayjs | null) => {
    if (!editedTodo) return;
    setEditedTodo({
      ...editedTodo,
      // Set time to end of day for due dates
      dueDate: newDate ? newDate.endOf('day').toISOString() : null,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Created: {dayjs(editedTodo.createdAt).format('MMM D, YYYY')}
            </Typography>

            <TextField
              label="Title"
              fullWidth
              value={editedTodo.text}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, text: e.target.value })
              }
            />
            
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={editedTodo.description || ''}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, description: e.target.value })
              }
            />

            <DatePicker
              label="Due Date"
              value={editedTodo.dueDate ? dayjs(editedTodo.dueDate) : null}
              onChange={handleDueDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'medium',
                },
              }}
            />

            <Box>
              <form onSubmit={handleAddSubtask}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    label="New Subtask"
                    size="small"
                    fullWidth
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                    disabled={!newSubtask.trim()}
                  >
                    Add
                  </Button>
                </Box>
              </form>

              <List>
                {editedTodo.subtasks.map((subtask, index) => (
                  <ListItem key={index} dense>
                    <ListItemText primary={subtask} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveSubtask(index)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={loading || !editedTodo.text.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};
