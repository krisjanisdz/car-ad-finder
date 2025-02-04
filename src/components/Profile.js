import React, { useState } from 'react';
import { Typography, Box, Button, Modal } from '@mui/material';

const Profile = ({ userEmail, handleLogout }) => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteAccount = async () => {
    try {
      //const apiUrl = process.env.REACT_APP_AWS_HOST; 
      const response = await fetch(`https://9yhw4w7nke.execute-api.eu-north-1.amazonaws.com/dev/user/${userEmail}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        handleLogout(); // Log the user out after account deletion
        console.log('Account deleted successfully');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error deleting account');
        console.error('Error deleting account:', errorData.message);
      }
    } catch (error) {
      setErrorMessage('Error deleting account');
      console.error('Error deleting account:', error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <Box sx={{ mt: 4, p: 3 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
        Profile Settings
      </Typography>

      <Typography variant="h6" textAlign="center">Logged in as: {userEmail}</Typography>
      
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Button variant="contained" color="error" onClick={handleOpenModal}>
          Delete Account
        </Button>
      </Box>

      {/* Delete Confirmation Modal */}
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
            Confirm Account Deletion
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDeleteAccount}>Delete</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Profile;

