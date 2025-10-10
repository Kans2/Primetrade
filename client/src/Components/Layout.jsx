import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Dashboard</Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 220 }}>
          <ListItem button onClick={() => { nav('/dashboard'); setOpen(false); }}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => { nav('/tasks'); setOpen(false); }}>
            <ListItemText primary="Tasks" />
          </ListItem>
          <ListItem button onClick={() => { nav('/profile'); setOpen(false); }}>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
