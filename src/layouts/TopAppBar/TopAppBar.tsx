import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, Avatar, List, ListItem, ListItemText, Divider, Box, Hidden } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import GridViewIcon from '@mui/icons-material/GridView';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { NavLink, useNavigate } from 'react-router-dom';
import { StyledAppBar } from './TopAppBarStyles';
import { useAuth } from '../../context/AuthContext';

const TopAppBar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, login, logout, user } = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

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
    ];

    const userInitials = user ? `${user?.firstName[0]}${user?.lastName[0]}`.toUpperCase() : '';

    return (
        <StyledAppBar>
            <AppBar position="sticky" sx={{ height: '50px' }}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {/* Title or Logo */}
                    </Typography>
                    <Hidden smDown>
                        {isAuthenticated && menuItems?.map(({ label, url, icon }, index) => (
                            <NavLink to={url} key={label + index}>
                                <IconButton sx={{ color: 'white', gap: 0.1 }}>
                                    {icon}
                                    <Typography>
                                        {label}
                                    </Typography>
                                </IconButton>
                            </NavLink>
                        ))}
                        {isAuthenticated ? (
                            <IconButton sx={{ color: 'white', gap: 0.1 }} onClick={logout}>
                                <LogoutIcon />
                                <Typography>Logout</Typography>
                            </IconButton>
                        ) : (
                            <IconButton sx={{ color: 'white', gap: 0.1 }} onClick={() => navigate('/login')}>
                                <Typography>Login</Typography>
                                <LoginIcon />
                            </IconButton>
                        )}
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
                    {isAuthenticated && (
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                                <Avatar>{userInitials}</Avatar>
                                <Typography variant="h6" sx={{ marginLeft: 2 }}>
                                    {user?.preferredName}
                                </Typography>
                            </Box>
                            <Divider />
                            <List>
                                {menuItems.map(({ label, url, icon }, index) => (
                                    <NavLink to={url} key={label + index} style={{ textDecoration: 'none', color: 'black' }}>
                                        <ListItem button>
                                        {React.cloneElement(icon, { sx: { marginRight: 2 } })}
                                            <ListItemText primary={label} />
                                        </ListItem>
                                    </NavLink>
                                ))}
                                <ListItem button>
                                    <SettingsIcon sx={{ marginRight: 2 }} />
                                    <ListItemText primary="Settings" />
                                </ListItem>
                                <ListItem button onClick={logout}>
                                    <LogoutIcon sx={{ marginRight: 2 }} />
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </List>
                        </>
                    )}
                    {!isAuthenticated && (
                        <List>
                            <ListItem button onClick={() => navigate('/login')}>
                                <LoginIcon sx={{ marginRight: 2 }}/>
                                <ListItemText primary={`Login`} />
                            </ListItem>
                        </List>
                    )}
                </Box>
            </Drawer>
        </StyledAppBar>
    );
};

export default TopAppBar;
