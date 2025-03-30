import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleComplete, updateTask } from '../redux/todoSlice';
import { useDrag, useDrop } from 'react-dnd';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { format } from 'date-fns';

const TaskItem = ({ task, index, moveTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(toggleComplete(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) return;
    
    dispatch(updateTask({
      id: task.id,
      updates: {
        title: editedTitle,
        description: editedDescription,
        priority: editedPriority
      }
    }));
    
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setEditedPriority(task.priority);
    setIsEditing(false);
  };

  // Drag and drop functionality
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover(item, monitor) {
      if (item.index === index) {
        return;
      }
      moveTask(item.index, index);
      item.index = index;
    },
  });

  // Priority colors
  const priorityColors = {
    low: '#8bc34a',
    medium: '#ffc107',
    high: '#f44336'
  };

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1, marginBottom: '10px' }}>
      <Card 
        sx={{ 
          borderLeft: `4px solid ${priorityColors[task.priority]}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 6,
          },
          backgroundColor: task.completed ? 'rgba(0, 0, 0, 0.05)' : 'inherit'
        }}
      >
        {isEditing ? (
          <CardContent>
            <TextField
              fullWidth
              label="Task Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              multiline
              rows={2}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" onClick={handleCancelEdit}>Cancel</Button>
              <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
            </Box>
          </CardContent>
        ) : (
          <>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Checkbox
                  checked={task.completed}
                  onChange={handleToggleComplete}
                  color="primary"
                />
                <Typography 
                  variant="h6" 
                  component="div"
                  sx={{ 
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'text.secondary' : 'text.primary'
                  }}
                >
                  {task.title}
                </Typography>
              </Box>
              
              {task.description && (
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    ml: 4,
                    mb: 2,
                    textDecoration: task.completed ? 'line-through' : 'none'
                  }}
                >
                  {task.description}
                </Typography>
              )}
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, ml: 4 }}>
                {task.dueDate && (
                  <Chip 
                    label={`Due: ${formatDate(task.dueDate)}`} 
                    size="small" 
                    variant="outlined" 
                  />
                )}
                <Chip 
                  label={`Priority: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`}
                  size="small"
                  style={{ backgroundColor: priorityColors[task.priority], color: 'white' }}
                />
                {task.completed && task.completedAt && (
                  <Chip 
                    label={`Completed: ${formatDate(task.completedAt)}`}
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                )}
              </Box>
            </CardContent>
            
            <CardActions disableSpacing>
              <IconButton aria-label="edit" onClick={handleEdit}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </>
        )}
      </Card>
    </div>
  );
};

export default TaskItem;
