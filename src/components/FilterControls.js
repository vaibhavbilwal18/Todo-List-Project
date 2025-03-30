import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, setSortBy, setSortDirection } from '../redux/todoSlice';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const FilterControls = () => {
  const { filter, sortBy, sortDirection } = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleFilterChange = (event, newValue) => {
    dispatch(setFilter(newValue));
  };

  const handleSortByChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  const handleSortDirectionChange = (event) => {
    dispatch(setSortDirection(event.target.value));
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Tabs
        value={filter}
        onChange={handleFilterChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="task filter tabs"
        sx={{ mb: 2 }}
      >
        <Tab label="All" value="all" />
        <Tab label="Active" value="active" />
        <Tab label="Completed" value="completed" />
        <Tab label="Today" value="today" />
        <Tab label="Upcoming" value="upcoming" />
        <Tab label="Overdue" value="overdue" />
      </Tabs>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={handleSortByChange}
              label="Sort By"
            >
              <MenuItem value="date">Due Date</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="created">Created Date</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Sort Direction</InputLabel>
            <Select
              value={sortDirection}
              onChange={handleSortDirectionChange}
              label="Sort Direction"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterControls;
