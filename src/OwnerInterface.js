import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './OwnerInterface.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import OwnerNavbar from './OwnerNavbar';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
 
 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function OwnerInterface() { 
const navigate = useNavigate('')
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
    const [showAdditionalButtons1, setShowAdditionalButtons1] = useState(false);
    const location = useLocation();
    const [crn, setCRN] = useState(null);
    const [name,setName]=useState(null);
    useEffect(() => {
      if (location.state && location.state.crn && location.state.name ) {
        setCRN(location.state.crn);
        setName(location.state.name)
        console.log('CRN:', location.state.crn);
        console.log('name',location.state.name);
      }
    }, [location.state]);  
  
    const toggleAdditionalButtons = () => {
        console.log('Button clicked'); 
      setShowAdditionalButtons(!showAdditionalButtons);
    };
    const toggleAdditionalButtons1 = () => { 
      console.log('Button clicked'); 
    setShowAdditionalButtons1(!showAdditionalButtons1);
  };
  const navigateToAgentRegistration = () => {
    navigate('/AgentRegistration', { state: { crn } })
  };
  const agent = () => {
    navigate('/AgentInfo', { state: { crn,name } })
  };
  const newTruck= () => {
    navigate('/NewTruck', { state: { crn,name } })
  };
  const truckPosting= () => {
    navigate('/TruckPosting', { state: { crn,name  } })
  };
  const Manage= () => {
    navigate('/OwnerBooking', { state: { crn ,name } })
  };
  const Driver= () => {
    navigate('/NewDriver', { state: { crn,name  } })
  };
  const Info= () => {
    navigate('/DriverInfo', { state: { crn ,name } })
  };
  const navigates = useNavigate(); 
  const handleLogout = () => {
    // Clear local storage and navigate to the login page
    localStorage.removeItem('userCRN');
    sessionStorage.removeItem('phoneNumber');
    sessionStorage.removeItem('password');
    navigate('/login'); // Navigate to the login page
  };

  
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className='ownerbg' >
      <OwnerNavbar/>
      <div> 
      <Box sx={{ width: '100%' }} className="container" >
      <Grid container >
        {/* <Grid xs={1}></Grid> */}
        
        <Grid xs={12} md={6} >
      

        <Typography variant='h4' bgcolor={'orange'} className='mb-2 mt-5' sx={{textAlign:'center',borderRadius:'5px' }}>
            Distance Calculator
          </Typography>

<form className='container shadow-sm'   id='distance-calculator'>
   <Grid container spacing={2}>
       <Grid item xs={12} md={5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
           <TextField
               label="From Pincode"
               variant="outlined"
               name="toPincode"
               size='small'
               id="toPincode"
               placeholder="Enter From Pincode"
               style={{ marginBottom: '8px' }}
               fullWidth
           />
           <TextField
               label="To Pincode"
               variant="outlined"
               name="toLocation"
               id="toLocation"
               size='small'
               placeholder="Enter To Pincode"
               fullWidth
           />
       </Grid>
       <Grid item xs={12} md={2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
           <Divider orientation="vertical" color="textPrimary" style={{ height: '30%', borderWidth: '1px', borderStyle: 'solid', fontWeight: 'bold' }} />
           <Typography variant="body2" color="textPrimary" style={{ marginTop: '8px' }}>
               (or)
           </Typography>
           <Divider orientation="vertical" color="textPrimary" className='mt-2' style={{ height: '30%', borderWidth: '1px', borderStyle: 'solid', fontWeight: 'bold' }}/>
       </Grid>
       <Grid item xs={12} md={5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
           <TextField
               label="From Location"
               variant="outlined"
               name="fromPincode"
               id="fromPincode"
               size='small'
               placeholder="Enter From Location"
               style={{ marginBottom: '8px' }}
               fullWidth
           />
           <TextField
               label="From Location"
               variant="outlined"
               name="fromLocation"
               size='small'
               id="fromLocation"
               placeholder="Enter To Location"
               fullWidth
           />
       </Grid>
       <Grid item xs={12} style={{ marginTop: '5px', display: 'flex', justifyContent: 'center' }}>
       <Button variant="contained" className='mt-3 ps-5 pe-5 mb-3' onClick={handleOpen} >Submit
              </Button>
       </Grid>
   </Grid>
</form>

          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        <div style={{overflowX:'scroll'}}> 
        <Box sx={style} >
        
          <Typography id="modal-modal-title" variant="p" component="p"  className='text-center'>
           <span> location Name - Pincode</span>
           <br/>
              <span className=''> Location Name - Pincode</span>
              <br/>
              <span className=''> Distance In KMs</span>
          </Typography>
          <Typography className='mt-4 text-center'>
            Country-State-District-mandel
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              <table className='table border striped'  >
                <tr>
                  <th>S.NO</th>
                  <th>Sub Location Name</th>
                  <th>Pincode</th>
                  <th>Distance In KMs</th>
                </tr>
                <tbody> 
                <tr >
                  <td>1</td>
                  <td>abcdefdffjfjgjkkkj</td>
                  <td>343535</td>
                  <td>5757km</td>
                </tr>
                <tr >
                  <td>2</td>
                  <td>abcdefdfdffhfjgjkkkj</td>
                  <td>343535</td>
                  <td>5757km</td>
                </tr>
                <tr >
                  <td>3</td>
                  <td>abcdefdfdffhkljjgjkkkj</td>
                  <td>343535</td>
                  <td>5757km</td>
                </tr>
                <tr >
                  <td>4</td>
                  <td>abcdefhffjfjgjkkkj</td>
                  <td>343535</td>
                  <td>5757km</td>
                </tr>  <tr >
                  <td>5</td>
                  <td>abchffjfjgjkkkj</td>
                  <td>343535</td>
                  <td>5757km</td>
                </tr>
                <tr >
                  <td>6</td>
                  <td>dffhffjfjgjkkkj</td>
                  <td>343535</td>
                  <td>5757km</td>
                </tr>
                </tbody>
              </table>
            </div>
          </Typography>
         
        </Box>
        </div>
      </Modal>

        </Grid>
        <Grid xs={12} md={5}  className='my-trucks-form' >

        <Typography variant='h4' bgcolor={'orange'} className='mb-1 container p-0 ' sx={{textAlign:'center',borderRadius:'5px' }}>
          My Trucks
          </Typography>


          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Card  >
    <CardContent className='mt-2' >
      <TextField
        id="outlined-number"
        label="Registered Number"
        type="number"
        size='small'
        required
        style={{ width: '200px' }}
        InputLabelProps={{
          shrink: true,
        }}
      />--
      <TextField
        id="outlined-number"
        label="Location"
        type='text'
        style={{ width: '200px' }}
        size='small'
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br />
      <br />
      <TextField
        id="outlined-number"
        required
        label="Posted Date"
        type='date'
        style={{ width: '200px' }}
        size='small'
        InputLabelProps={{
          shrink: true,
        }}
      />
    </CardContent>
    <div style={{display:'flex',justifyContent:'center'}}> 
    <Button variant="contained" className='mt-3 ps-5 pe-5 mb-4'  >Submit</Button>
    </div>
  </Card>
</div>

        </Grid>


        
       
      </Grid>
    </Box>

    

</div>

          
    



        


 

 
            

      </div>
    
  );
}

export default OwnerInterface;
