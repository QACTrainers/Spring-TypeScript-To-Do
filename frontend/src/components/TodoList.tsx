import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Box,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (todo: Todo) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onEdit: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
}) => {
  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          sx={{
            bgcolor: 'background.paper',
            mb: 1,
            borderRadius: 1,
          }}
        >
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggle(todo)}
          />
          <ListItemText
            primary={todo.text}
            secondary={
              <Box component="span">
                {todo.dueDate && format(new Date(todo.dueDate), 'MMM d, yyyy')}
                {todo.description && (
                  <span style={{ marginLeft: 8, color: 'text.secondary' }}>
                    {todo.description.slice(0, 50)}
                    {todo.description.length > 50 && '...'}
                  </span>
                )}
                {todo.subtasks.length > 0 && (
                  <span style={{ marginLeft: 8, color: 'text.secondary' }}>
                    ({todo.subtasks.length} subtasks)
                  </span>
                )}
              </Box>
            }
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          />
          <ListItemSecondaryAction>
            <Tooltip title="Edit">
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEdit(todo)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(todo.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};
