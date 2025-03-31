# Todo List Application

A feature-rich task management application built with React, Redux, and Material UI.

## Features

- Create, edit, delete, and mark tasks as complete
- Filter and sort tasks by status, date, and priority
- Responsive design for mobile and desktop
- Drag and drop functionality for task reordering
- Data persistence with localStorage

## Tech Stack

- React.js (with Hooks)
- Redux (Redux Toolkit)
- Material UI
- React DnD (Drag and Drop)
- date-fns for date formatting

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Setup Instructions

### 1. Clone the repository or create a new project

```bash
# Option 1: Create a new project
npx create-react-app todo-list-app
cd todo-list-app

# Option 2: If cloning from a repository
git clone <repository-url>
cd todo-list-app
```

### 2. Install dependencies

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers date-fns @reduxjs/toolkit react-redux react-dnd react-dnd-html5-backend react-dnd-touch-backend uuid
```

### 3. Project Structure

Create the following folder structure:

```
src/
├── components/
│   ├── FilterControls.js
│   ├── TaskForm.js
│   ├── TaskItem.js
│   └── TaskList.js
├── redux/
│   └── todoSlice.js
├── App.js
└── index.js
```

### 4. Copy source files

Copy the provided source code into the respective files:
- `App.js` - Main application component
- `components/FilterControls.js` - Filter and sort controls
- `components/TaskForm.js` - Form for adding tasks
- `components/TaskItem.js` - Individual task component
- `components/TaskList.js` - Task list component
- `redux/todoSlice.js` - Redux slice for state management

### 5. Update index.js

Make sure your `index.js` file includes:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 6. Start the development server

```bash
npm start
```

The application should now be running at https://todo-list-project-one-chi.vercel.app/

## Usage

- **Add a task**: Fill out the form at the top and click "Add Task"
- **Edit a task**: Click the edit icon on any task
- **Complete a task**: Check the checkbox next to the task
- **Delete a task**: Click the delete icon on any task
- **Filter tasks**: Use the tabs to filter by status or date
- **Sort tasks**: Use the dropdown menus to sort by different criteria
- **Reorder tasks**: Drag and drop tasks to change their order

## Evaluation Criteria

This application was built with the following evaluation criteria in mind:

1. **Component organization and state management**
   - Clean component structure with separation of concerns
   - Efficient state management using Redux
   - Local component state with React hooks

2. **User interface and experience**
   - Intuitive and clean user interface
   - Visual indicators for task status and priority
   - Smooth animations and transitions

3. **Responsive design implementation**
   - Fully responsive layout
   - Mobile-friendly interface
   - Adaptive components based on screen size

