import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { StyledAppBar } from './TopAppBarStyles';

const TopAppBar = () => {

    const navigate = useNavigate()

  return (
    <StyledAppBar>
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>
        <IconButton color="inherit" onClick={() => navigate('../')}>
          <ArrowBackIcon /> Go back
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate('/dashboard')}>
          Dashboard
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate('/addExpense')}>
          Add Expense
        </IconButton>
      </Toolbar>
    </AppBar>
    </StyledAppBar>
  );
};

export default TopAppBar;
