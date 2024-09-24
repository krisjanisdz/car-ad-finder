// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        //const data = await response.json();
        handleLogin(email);  // Set the authentication state
        navigate('/home');  // Navigate to the home page
      } else {
        const errorData = await response.json();
        setError(errorData.message);  // Display error message
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h4" component="h1" textAlign="center">
          Log In
        </Typography>

        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Log In
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
