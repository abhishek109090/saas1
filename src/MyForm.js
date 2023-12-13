
import React from 'react';
import './MyForm.css'
import {
  Container,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  InputAdornment,
  IconButton,
  Typography
} from '@mui/material';
import { Lock, VpnKey, Check } from '@mui/icons-material';

const MyForm = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3f51b5', // Adjust the primary color as needed
      },
    },
  });

  const styles = {  
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    width:'350px',
    height: '100vh',
    backgroundColor: theme.palette.background.default,

  };

  return (
    <ThemeProvider theme={theme}>
      
      <div  className='' >
        <Container component="form" style={styles} className=''>
        <Typography fullwidth className=' p-3 text-center text-light shadow' style={{backgroundColor:'#3f51b5'}} >Change Password !</Typography>
            <div  className='form-bg shadow  ps-3 pb-3' > 
            <form> 
          <TextField
            label="Old Password"
            variant="outlined"
            margin="normal"
            required
            placeholder='Enter Old Password'
            color="primary"
            type="password"
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
          <TextField
            label="New Password"
            variant="outlined"
            margin="normal"
            required
            placeholder='Enter New Password'
            color="primary"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Lock />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            required
            placeholder='Enter Confirm Password'
            color="primary"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Check />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className='d-flex flex-row justify-content-center '> 
          <Button type="submit" variant="contained" className=' w-50 mt-3 ' color="primary">
            Submit
          </Button>
          </div>
          </form>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default MyForm;
