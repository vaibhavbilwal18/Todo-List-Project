import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reorderTasks } from '../redux/todoSlice';
import TaskItem from './TaskItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const TaskList = () => {
  const { tasks, filter, sortBy, sortDirection } = useSelector(state => state.todos);
  const dispatch = useDispatch();

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    
    // Filter by due date (today, upcoming, overdue)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (filter === 'today' && task.dueDate) {
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    }
    
    if (filter === 'upcoming' && task.dueDate) {
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate > today;
    }
    
    if (filter === 'overdue' && task.dueDate) {
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today && !task.completed;
    }
    
    return true;
  });

  // Sort tasks based on selected sort criteria
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === 'priority') {
      const priorityValues = { high: 3, medium: 2, low: 1 };
      comparison = priorityValues[b.priority] - priorityValues[a.priority];
    } else if (sortBy === 'date') {
      if (!a.dueDate && !b.dueDate) {
        comparison = 0;
      } else if (!a.dueDate) {
        comparison = 1;
      } else if (!b.dueDate) {
        comparison = -1;
      } else {
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
      }
    } else if (sortBy === 'created') {
      comparison = new Date(a.createdAt) - new Date(b.createdAt);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Handle task reordering with drag and drop
  const moveTask = useCallback((sourceIndex, destinationIndex) => {
    dispatch(reorderTasks({ sourceIndex, destinationIndex }));
  }, [dispatch]);

  return (
    <Box sx={{ mt: 4 }}>
      {sortedTasks.length === 0 ? (
        <Alert severity="info">
          {filter === 'all' 
            ? 'No tasks yet. Add a task to get started!' 
            : 'No tasks match the current filter.'}
        </Alert>
      ) : (
        sortedTasks.map((task, index) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            index={index}
            moveTask={moveTask}
          />
        ))
      )}
    </Box>
  );
};

export default TaskList;
