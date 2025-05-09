import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Stock Aggregator
        </Typography>
        <Button color="inherit" component={Link} to="/stocks" disabled={location.pathname === '/stocks'}>
          Stock Chart
        </Button>
        <Button color="inherit" component={Link} to="/heatmap" disabled={location.pathname === '/heatmap'}>
          Correlation Heatmap
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
