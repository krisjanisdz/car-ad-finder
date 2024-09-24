import React from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close'; // Import the "X" button icon

const Dashboard = ({ searchResults, handleDelete }) => {
  return (
    <Box sx={{ mt: 4, p: 3 }}>
      <Typography variant="h3" textAlign="center">
        Cars We Found for You
      </Typography>

      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <Accordion key={index} sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {/* Display the fields and replace empty values with "Any" */}
              <Typography>
                {result.carBrand} | {result.carModel} | {result.motorSize} | {result.mileage} km | $ {result.price}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>

                {/* Placeholder for future links to ads */}
                <ListItem sx={{bottom:'10px'}}>
                  <ListItemText primary="Ad links will be displayed here" />
                </ListItem>
              </List>

              {/* Delete Button (styled as "X") */}
              <IconButton 
                onClick={() => handleDelete(index)} // Delete button handler
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 auto',  
                  mt: 2,             
                }}
              >
                <CloseIcon />
              </IconButton>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography>No search results yet. Start searching!</Typography>
      )}
    </Box>
  );
};

export default Dashboard;
