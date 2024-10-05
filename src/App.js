import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box, Menu, MenuItem, IconButton, CircularProgress } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Dashboard from './components/Dashboard'; 
import CarFinder from './components/CarFinder'; 
import Profile from './components/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchResults, setSearchResults] = useState([]); // Add state to hold search results
  const userEmail = localStorage.getItem('userEmail');
  console.log("user email: ", userEmail)
  
  useEffect(() => {
    const authState = localStorage.getItem('isAuthenticated');
    if (authState) {
      setIsAuthenticated(JSON.parse(authState));
    }
    setLoading(false);
  }, []);

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('userEmail', email); // Store email in local storage
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCarSearch = async (formData) => {
    console.log('User Search Data:', formData);
  
    // Step 1: Update the searchResults array (client-side)
    setSearchResults((prevResults) => [...prevResults, formData]);
  
    // Step 2: Send the search data to the backend (server-side)
    try {
      const response = await fetch('http://localhost:3001/api/save-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,  // Replace with the logged-in user's email
          search: formData,
        }),
      });
  
      if (response.ok) {
        console.log('Search saved successfully');
      } else {
        console.error('Error saving search');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleDelete = (index) => {
    // Remove the search result by index
    setSearchResults((prevResults) => prevResults.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <AppBar position="static" sx={{ bgcolor: '#1973b3' }}>
        <Toolbar>
          {!isAuthenticated ? (
            <>
              <Button component={Link} to="/login" color="inherit">
                Log In
              </Button>
              <Button component={Link} to="/signup" color="inherit">
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Box sx={{ ml: 'auto' }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  sx={{ marginLeft: 'auto' }}
                >
                  <AccountCircle />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/home" onClick={handleClose}>
                    Home
                  </MenuItem>
                  <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
                    Dashboard
                  </MenuItem>
                  <MenuItem component={Link} to="/carfinder" onClick={handleClose}>
                    CarFinder
                  </MenuItem>
                  <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} sx={{ bgcolor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={<SignUp handleLogin={handleLogin} />}
            />
            <Route
              path="/home"
              element={
                isAuthenticated ? <Home /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard userEmail ={userEmail} searchResults={searchResults} handleDelete={handleDelete} /> : <Navigate to="/login" />}
            />
            <Route
              path="/carfinder"
              element={isAuthenticated ? <CarFinder handleCarSearch={handleCarSearch} /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile userEmail={userEmail} handleLogout={handleLogout} /> : <Navigate to="/login" />}
            />
          </Routes>
      </Container>
    </Router>
  );
}

export default App;
