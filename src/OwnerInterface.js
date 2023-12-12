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

// const [data,Setdata] = useState('')
// useEffect(()=>
// axios.get('')
// .then(res=>Setdata(res.data))
// )
// .catch(err =>{console.log("err")})


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

          
    



        {/* <div  className='' style={{marginBottom:'90px'}}>
        <nav className="navbar navbar-expand-md" >
        <ul className="navbar-nav me-auto" >
 <li className='nav-item'>
          <div className="numbered-button">
            <button className="navhome">
            <a href="OwnerInterface" style={{textDecoration:'none',color:'black',}}>Home</a>
            </button>
          </div>
          </li>
          
        </ul>
        <button className="navbar-toggler text-white bg-info" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto ms-3 mt-2 me-3">
          <li className="nav-item" style={{marginLeft:'240px'}}>
          <div class="dropdown">
  <button class=" dropdown-toggle centered-button1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Agent
  </button>
 
  <ul class="dropdown-menu" style={{backgroundColor:'transparent',border:'none'}}>
    <li>
      <button className="centered-button7" onClick={navigateToAgentRegistration}>
                Agent Registration
                <span className='childzoom'>Agent Registration</span> 
                </button></li>
    <li>
      <button className="centered-button7" onClick={agent} >
                 Agent Info
              
                </button>
      </li>
  </ul>
</div>
 </li>
            <li className="nav-item">
            <div className="numbered-button">
            <span className="number">2</span>
            <button className="centered-button2" onClick={newTruck}>
               Truck Registrations
               <span className='zoom'>Truck Registrations</span> 
            </button>
          </div>
            </li>
            
            <li className="nav-item">
            <div className="numbered-button">
            <span className="number">3</span>
            <button className="centered-button3" onClick={truckPosting}>
              Truck Posting
              <span className='zoom'>Truck Posting </span> 
            </button>
          </div>
 
            </li>
            <li className="nav-item">
            <div className="numbered-button">
            <span className="number">4</span>
            <button className="centered-button4"onClick={Manage}>
        Manage Bookings
        <span className='zoom'>Manage Bookings</span> 
            </button>
          </div>
            </li>
            <li className="nav-item">         
<div class="dropdown">
  <button class=" dropdown-toggle centered-button1 ms-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Driver
  </button>
  <ul class="dropdown-menu" style={{backgroundColor:'transparent',border:'none'}}>
    <li> 

    <button className="centered-button7   " onClick={Driver}>
                  Add New Driver
                  <span className='zoom'>Add New Driver</span> 
                </button>         
      </li>
    <li>
    <button className="centered-button7 " onClick={Info} >
                  Driver info
                  <span className='zoom'>Driver info </span> 
                </button>
      </li>
    
  </ul>
</div>
            </li>

            <li class="nav-item mb-1 ms-3">
      <ul className="navbar-list" style={{fontWeight:'bold',color:'white'}}>
          <li className="navbar-item dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-person-circle text-dark" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd"  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>  <span style={{color:'black'}} className='ms-auto'>My Profile</span>  
            <div className="dropdown-content" style={{textDecoration:'none'}}>
              <a href="#"style={{textDecoration:'none'}}>My Profile</a>
              <a href="OwnerInterface" style={{textDecoration:'none'}}>Home</a>
              <a href="Dashboard" onClick={handleLogout}style={{textDecoration:'none'}}>Logout</a>
            </div>
          </li>
        </ul>
      </li>
          </ul>
        </div>        
 </nav>
          </div> */}


 

 
            

      </div>
    
  );
}

export default OwnerInterface;
