import React, { useState } from 'react';
import { Container, Box, TextField, Select, MenuItem, Button, InputLabel, FormControl, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CarSearchForm = ({ onSubmit }) => {
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [motorSize, setMotorSize] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      carBrand: carBrand || 'Any',
      carModel: carModel || 'Any',
      motorSize: motorSize || 'Any',
      mileage: mileage || 'Any',
      price: price || 'Any',
    };

    onSubmit(formData);
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
        <Typography variant="h4" textAlign="center">Find Your Desired Car</Typography>

        {/* Car Brand Field */}
        <FormControl fullWidth>
          <InputLabel id="brand-label">Car Brand</InputLabel>
          <Select
            labelId="brand-label"
            value={carBrand}
            onChange={(e) => setCarBrand(e.target.value)}
            label="Car Brand"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="Toyota">Toyota</MenuItem>
            <MenuItem value="BMW">BMW</MenuItem>
            <MenuItem value="Mercedes">Mercedes</MenuItem>
            <MenuItem value="Audi">Audi</MenuItem>
          </Select>
        </FormControl>

        {/* Car Model Field */}
        <TextField
          label="Car Model"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          variant="outlined"
          fullWidth
          disabled={carBrand === ''}  // Disable if car brand is None
        />

        {/* Motor Size Field */}
        <TextField
          label="Motor Size (e.g., 2.0L)"
          value={motorSize}
          onChange={(e) => setMotorSize(e.target.value)}
          variant="outlined"
          fullWidth
        />

        {/* Mileage Field */}
        <TextField
          label="Mileage (km)"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          variant="outlined"
          fullWidth
        />

        {/* Price Field */}
        <TextField
          label="Max Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          variant="outlined"
          fullWidth
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Search
        </Button>
      </Box>
    </Container>
  );
};

export default CarSearchForm;
