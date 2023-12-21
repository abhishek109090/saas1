import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
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
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style= {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
 
function OwnerInterface() { 
    const navigate = useNavigate('')
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
    const [showAdditionalButtons1, setShowAdditionalButtons1] = useState(false);
    const location = useLocation();
 
    const [data, setData] = useState([]);
const crn  = sessionStorage.getItem('userCRN')
const name = sessionStorage.getItem('name')
console.log('crn',crn)
useEffect(() => {
  // Fetch data from the backend API based on CRN
  const fetchData = async (crn) => {
    try {
      console.log('crnss', crn);
      // Replace with the actual CRN number or get it dynamically
      const response = await fetch(`https://mynode.trucksbooking.in/truck/${crn}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData(crn); // Pass the crn variable to the fetchData function
}, [crn]);

    // useEffect(() => {
    //   if (location.state && location.state.crn && location.state.name ) {
    //     setCRN(location.state.crn);
    //     setName(location.state.name)
    //     console.log('CRN:', location.state.crn);
    //     console.log('name',location.state.name);
    //   }
    // }, [location.state]);  
  
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


// const [data,Setdata] = useState('')
// useEffect(()=>
// axios.get('')
// .then(res=>Setdata(res.data))
// )
// .catch(err =>{console.log("err")})

const [showSuccessMessage, setShowSuccessMessage] = useState(false);

useEffect(() => {
  // Check if the success message should be displayed
  const shouldDisplayMessage = sessionStorage.getItem('displaySuccessMessage');

  if (shouldDisplayMessage) {
    // Display the success message
    setShowSuccessMessage(true);
    // Remove the flag from sessionStorage
    sessionStorage.removeItem('displaySuccessMessage');
    // Automatically hide the message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  }
}, []);

  return (
    <div className='ownerbg'  >
      <OwnerNavbar/>

      {showSuccessMessage && (
        <div className="success-message mt-4 p-3" >
              <Alert severity="success" variant='filled'>
              <strong> Login Successful !</strong>

             </Alert>
        </div>
      )}

      <div className='zindex'  > 
      <Box  className="container-fulid" >
      <Grid container  spacing={6}>
        <Grid xs={12} md={5}  >
        <Typography variant='h4' bgcolor={'orange'} className='mb-2 mt-5 ' sx={{textAlign:'center',borderRadius:'5px' }}>
            Distance Calculator
          </Typography>
<form className='container'  >
   <Grid container spacing={2}  component={Paper}  className='pt-3'>
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
        
        <Typography  variant="p" component="p"  className='text-center'>
           <table className='table border table-primary'>
            <tr>
              <th>From location - Pincode</th>
              <th>To Location - Pincode</th>
              <th> Distance KMs</th>
            </tr>
           </table>


           </Typography>
           <Typography className='mt-4 text-center text-primary' variant='h6'>
             Country-State-District-mandel
           </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} >
            <div>
              <table className='table border table-striped table-primary table-hover'   >
                <tr>
                  <th className='thead'>S.NO</th>
                  <th className='thead'>Sub Location Name</th>
                  <th className='thead'>Pincode</th>
                  <th className='thead'>Distance In KMs</th>
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
        <Grid xs={12} md={7} className='my-trucks-form'>
  <Typography variant='h4' bgcolor={'orange'} className='mb-1 p-0 ' sx={{ textAlign: 'center', borderRadius: '5px' }}>
    My Trucks
  </Typography>

  {data.length === 0 ? (
    <Typography variant='body1' sx={{ textAlign: 'center', mt: 2 }}>
      No truck details available.
    </Typography>
  ) : (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className='table border table-striped table-hover' component={Paper}>
        <TableHead>
          <TableRow>
            <StyledTableCell>S.No</StyledTableCell>
            <StyledTableCell align="center">Truck Number</StyledTableCell>
            <StyledTableCell align="center">Approved Status</StyledTableCell>
            <StyledTableCell align="center">Posting Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {data.map((truck, index) => (
            <StyledTableRow key={truck.truckNumber} >
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell style={{textAlign:'center',fontWeight:'bold'}}>{truck.truckNumber}</StyledTableCell>
              <StyledTableCell style={{textAlign:'center',fontWeight:'bold',textTransform:'capitalize'}}>{truck.status}</StyledTableCell>
              <StyledTableCell style={{textAlign:'center',fontWeight:'bold',textTransform:'capitalize'}}>{truck.truckstatus}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}
</Grid>

      </Grid>
    </Box>
</div>
      </div>
    
  );
}

export default OwnerInterface;