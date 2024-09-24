import React from 'react';
import { Typography, Box } from '@mui/material';
import CarSearchForm from './CarSearchForm';

const CarFinder = ({ handleCarSearch }) => {

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
      <div>
        <Typography variant="h3" textAlign="center" sx={{ mt: 4 }}>
          Car Finder
        </Typography>
        <CarSearchForm onSubmit={handleCarSearch} />
      </div>
    </Box>
  );
};

export default CarFinder;
