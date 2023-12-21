import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './MyForm.css';
import {
  Container,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import { Lock, VpnKey, Check, Visibility, VisibilityOff } from '@mui/icons-material';

const AgentForm = () => {
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3f51b5',
      },
    },
  });

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const crn = sessionStorage.getItem('agentCRN');
  const name = sessionStorage.getItem('agentName');
  const password = sessionStorage.getItem('password1');
console.log(crn,name,password)
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '350px',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  };

  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');

    // Validate old password
    if (oldPassword !== password) {
      setError('Please enter correct old password.');
      return;
    }

    // Validate new password and confirm password
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Send request to update password and logged status
    try {
      const response = await axios.put('https://mynode.trucksbooking.in/updatePassword1', {
        crn,
        password:newPassword,
        loggedstatus: 'completed',
      });

      if (response.status === 200) {
        setError('');
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate('/Dashboard');
        }, 3000);
      } else {
        setError('Failed to update password and/or logged status.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Update error:', error);
    }
  };
  useEffect(() => {
    if (success) {
      navigate('/Dashboard', { replace: true });
    }
  }, [success, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <div className="">
        <Container
          component="form"
          style={styles}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Typography
            fullWidth
            className="p-3 text-center text-light shadow"
            style={{ backgroundColor: '#3f51b5' }}
          >
            Change Password !
          </Typography>
          <div className="form-bg shadow ps-3 pb-3">
            {/* Old Password */}
            <TextField
              label="Old Password"
              variant="outlined"
              margin="normal"
              required
              placeholder="Enter Old Password"
              color="primary"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <VpnKey />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* New Password */}
            <TextField
              label="New Password"
              variant="outlined"
              margin="normal"
              required
              placeholder="Enter New Password"
              color="primary"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password */}
            <TextField
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              required
              placeholder="Enter Confirm Password"
              color="primary"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div className="d-flex flex-row justify-content-center ">
              <Button
                type="submit"
                variant="contained"
                className="w-50 mt-3"
                color="primary"
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Display success message */}
          {success && (
            <Typography
              className="text-success text-center mt-3"
              variant="subtitle2"
            >
              Password updated successfully. Redirecting to the dashboard...
            </Typography>
          )}

          {/* Display error message */}
          {error && (
            <Typography
              className="text-danger text-center mt-3"
              variant="subtitle2"
            >
              {error}
            </Typography>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default AgentForm;
