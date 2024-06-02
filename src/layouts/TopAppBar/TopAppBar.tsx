import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GridViewIcon from '@mui/icons-material/GridView';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { NavLink, useNavigate } from 'react-router-dom';
import { StyledAppBar } from './TopAppBarStyles';

const TopAppBar = () => {

    const navigate = useNavigate()

    const menuItems = [
        {
            label: 'Dashboard',
            url: './dashboard',
            icon: <GridViewIcon />
        },
        {
            label: 'Add Expense',
            url: './addExpense',
            icon: <AddShoppingCartIcon />
        },
    ]

    return (
        <StyledAppBar>
            <AppBar position="sticky" sx={{ height: '50px' }}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>
                    {/* <NavLink to="./">
                        <IconButton>
                            <ArrowBackIcon />
                            <Typography>
                                Go back
                            </Typography>
                        </IconButton>
                    </NavLink> */}
                    {menuItems?.map(({ label, url, icon }) =>
                        <NavLink to={url}>
                            <IconButton sx={{color: 'white', gap:0.1}}>
                                {icon}
                                <Typography>
                                    {label}
                                </Typography>
                            </IconButton>
                        </NavLink>
                    )}
                </Toolbar>
            </AppBar>
        </StyledAppBar>
    );
};

export default TopAppBar;
