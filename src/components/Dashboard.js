import React, { useEffect, useState } from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, IconButton, Modal, Button } from '@mui/material';
import { ExpandMore, Close } from '@mui/icons-material';

const Dashboard = ({ userEmail }) => {
  const [searches, setSearches] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    // Fetch saved searches for the user on page load
    const fetchSearches = async () => {
      try {
        console.log('Fetched for:', userEmail);
        const response = await fetch(`http://localhost:3001/api/searches/${userEmail}`);
        const data = await response.json();
        console.log('Fetched searches:', data);
  
        if (Array.isArray(data)) {
          setSearches(data);
        } else {
          setSearches([]);
        }
      } catch (error) {
        console.error('Error fetching searches:', error);
      }
    };
  
    fetchSearches();
  }, [userEmail]);

  const handleOpenModal = (index) => {
    setDeleteIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDeleteIndex(null);
  };

  const handleDelete = async () => {
    if (deleteIndex === null) return; // Safeguard

    try {
      const response = await fetch(`http://localhost:3001/api/searches/${userEmail}/${deleteIndex}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update local state to reflect the deletion immediately
        setSearches((prevSearches) => prevSearches.filter((_, i) => i !== deleteIndex));
        console.log('Search deleted successfully');
      } else {
        const errorData = await response.json();
        console.error('Error deleting search:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      handleCloseModal(); // Close the modal after the operation
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
            <Typography variant="body1" component="span" fontWeight="bold">
              {search.carBrand || 'Any'} | {search.carModel || 'Any'} | {search.motorSize || 'Any'} | {search.mileage || 'Any'} km | ${search.price || 'Any'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Found Ads Will Be Displayed Here</Typography>
            <IconButton onClick={() => handleOpenModal(index)} sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
              <Close />
            </IconButton>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Confirmation Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          textAlign: 'center'
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this search?
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
