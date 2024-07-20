import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://shimmering-marsh-raisin.glitch.me/forgot-password', { email });
      setMessage('Recovery email sent');
    } catch (error) {
      setMessage('Error sending recovery email');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
          </Button>
        </Box>
        {message && (
          <Typography variant="body2" color="textSecondary" mt={2}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
