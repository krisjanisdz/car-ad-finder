// src/components/Home.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Are You Looking for Something?
      </Typography>
      
    </Box>
  );
};

export default Home;
