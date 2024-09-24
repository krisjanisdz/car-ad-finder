import React, { useEffect, useState } from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import { ExpandMore, Close } from '@mui/icons-material';

const Dashboard = ({ userEmail }) => {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    // Fetch saved searches for the user
    const fetchSearches = async () => {
      try {
        console.log('Fetched for:', userEmail); // Log the data
        const response = await fetch(`http://localhost:3001/api/searches/${userEmail}`);
        const data = await response.json();
        console.log('Fetched searches:', data); // Log the data
        setSearches(data);  // Populate the state with saved searches
      } catch (error) {
        console.error('Error fetching searches:', error);
      }
    };
  
    fetchSearches();
  }, [userEmail]);

  const handleDelete = async (index) => {
    try {
      // Make a request to delete the search from the backend
      const response = await fetch(`http://localhost:3001/api/searches/${userEmail}/${index}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the local state to remove the deleted search
        const updatedSearches = searches.filter((_, i) => i !== index);
        setSearches(updatedSearches);
        console.log('Search deleted successfully');
      } else {
        const errorData = await response.json();
        console.error('Error deleting search:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ mt: 4, p: 3 }}>

      <Typography variant="h3" textAlign="center" sx={{ mt: 4 }} paddingBottom='30px'>
        Cars We Found for You
      </Typography>

      {searches.map((search, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="body1" component="span" fontWeight="bold" >
              {search.carBrand || 'Any'} | {search.carModel || 'Any'} | {search.motorSize || 'Any'} | {search.mileage || 'Any'} km | ${search.price || 'Any'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* In the future, you will display links to advertisements here */}
            <Typography>Found Ads Will Be Displayed Here</Typography>
            <IconButton onClick={() => handleDelete(index)} sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto'}}>
              <Close />
            </IconButton>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Dashboard;
