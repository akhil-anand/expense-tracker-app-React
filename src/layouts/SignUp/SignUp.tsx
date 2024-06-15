import React, { useState } from 'react';
import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    preferredName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true)
      const response = await axios.post('https://shimmering-marsh-raisin.glitch.me/signup', formData);
      setSuccess('Sign Up successful');
      setFormData({ preferredName: '', firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
      setTimeout(() => {
        setSuccess('Redirecting to login page...')
      }, 1000);
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    } catch (error) {
      setError('Sign Up failed');
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" mb={2}>Sign Up</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Preferred Name"
              name="preferredName"
              value={formData.preferredName}
              onChange={handleChange}
              fullWidth
              required
              size='small'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
              size='small'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
              size='small'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              size='small'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              size='small'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              size='small'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />            
          </Grid>
          <Grid item xs={12}>
            <LoadingButton loading={isLoading} type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </LoadingButton>
          </Grid>
        </Grid>
        {error && <Typography color="error" mb={2} mt={2}>{error}</Typography>}       
        {success && <Typography color="#14af14" mb={2} mt={2}>{success}</Typography>}
      </Box>
    </Container>
  );
};

export default Signup;
