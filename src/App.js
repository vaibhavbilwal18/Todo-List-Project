import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import todoReducer from './redux/todoSlice';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterControls from './components/FilterControls';

const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isMobile = useMediaQuery('(max-width:600px)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#3f51b5',
          },
          secondary: {
            main: '#f50057',
          },
        },
      }),
    [prefersDarkMode],
  );

  // Choose the appropriate backend based on device type
  const dndBackend = isMobile ? TouchBackend : HTML5Backend;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DndProvider backend={dndBackend}>
          <Container maxWidth="md">
            <Box sx={{ my: 4, textAlign: 'center' }}>
              <Typography variant="h3" component="h1" gutterBottom>
                Task Manager
              </Typography>
              <TaskForm />
              <FilterControls />
              <TaskList />
            </Box>
          </Container>
        </DndProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;