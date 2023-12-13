import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from './images/dbg.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import img5 from './images/5.jpg'
import img6 from './images/6.jpg'
import img7 from './images/8.jpg'
import img8 from './images/9.jpg'
import img9 from './images/10.webp'
import img10 from './images/11.jpg'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import video from './vedio/Vedio.mp4'

import './Dashboard.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



function Dashboard() {
  const navigate=useNavigate();
  const [popupVisible1, setPopupVisible1] = useState(false);
  const [chatPopupVisible, setChatPopupVisible] = useState(false);
  const [popupVisible2, setPopupVisible2] = useState(false);
  const [popupVisible3, setPopupVisible3] = useState(false);
  const [phonenumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const authenticateUser = async () => {
    const storedPhoneNumber = sessionStorage.getItem('phoneNumber');
    const storedPassword = sessionStorage.getItem('password');

    if (storedPhoneNumber && storedPassword) {
      // Automatically log in using stored credentials
      try {
        const response = await axios.post('http://3.109.145.125:9001/auth', {
          phonenumber: storedPhoneNumber,
          password: storedPassword,
        });

        if (response.status === 200) {
          // Successful login
          const userData = response.data.user;

          if (userData && userData.crn) {
            const userCRN = userData.crn;

            // Store user CRN in localStorage
            localStorage.setItem('userCRN', userCRN);

            console.log('Automatic Login successful');
            setMessage('Automatic Login Successful!');
            navigate('/OwnerInterface');
          } else {
            // Handle missing CRN in the response
            setError('CRN not found in user data');
          }
        }
      } catch (error) {
        setError('Automatic login failed. Please log in manually.');
        console.error('Automatic Login error:', error);
      }
    }
  };

  useEffect(() => {
    // Check for automatic login on component mount
    authenticateUser();
  }, []);
  
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate input (you can add more validation)
    if (!phonenumber || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Send a request to your backend for authentication using axios
      const response = await axios.post('http://3.109.145.125:9001/auth', {
        phonenumber,
        password,
      });

      if (response.status === 200) {
        // Successful login
        const userData = response.data.user;
 const token = response.data.token;
        if (userData && userData.crn) {
          const userCRN = userData.crn;
          const feildCRN = userData.feildcrn;

          const name= userData.ownername;
          console.log(userCRN)
          console.log(feildCRN)

          localStorage.setItem('userToken', token);
          // Store user CRN in localStorage
          localStorage.setItem('userCRN', userCRN);
          sessionStorage.setItem('userCRN', userCRN);
          sessionStorage.setItem('feildCRN', feildCRN);

          sessionStorage.setItem('phoneNumber', phonenumber);
          sessionStorage.setItem('password', password);
          sessionStorage.setItem('name', name);
          const loginTimestamp = new Date().getTime();
          localStorage.setItem('loginTimestamp', loginTimestamp);
          console.log('Login successful');
          setMessage('Successful Login!');
          navigate('/OwnerInterface', { state: { crn: userCRN,name:name } });
        } else {
          // Handle missing CRN in the response
          setError('CRN not found in user data');
        }
      } else {
        // Failed login
        const data = response.data;
        setError(data.message || 'Login failed.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Login error:', error);
    }
 
};
  const handleLogin1 = async (e) => {
    e.preventDefault();

    // Validate input (you can add more validation)
    if (!phonenumber || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Send a request to your backend for authentication
      const response = await axios.post('http://3.109.145.125:9001/Agentauth', {
        agentId:phonenumber,
        password,
      });
console.log(response ,'login')
      if (response.status === 200) {
        // Agent login successful
        // const agentData = await response.json();
  
        // Fetch agent type
        const agentTypeResponse =  await axios.get('http://3.109.145.125:9001/agentType', {
          params: {
            agentId:phonenumber
            
          },

        });
        console.log(agentTypeResponse,'resoponse')
  
        if (agentTypeResponse.status === 200) {
          const agentTypeData = await agentTypeResponse.data;
          console.log(agentTypeData,'jijij')
          const agentType = agentTypeData[0].agentType;
          const name = agentTypeData[0].name;
          const agentId = agentTypeData[0].agentId;
          const phonenumber = agentTypeData[0].phonenumber;
          const crn = agentTypeData[0].crn;
          sessionStorage.setItem('phoneNumber1', phonenumber);
          sessionStorage.setItem('password1', password);
          sessionStorage.setItem("agentCRN", crn);
          sessionStorage.setItem("agentName", name);
          sessionStorage.setItem("agentId", agentId);

          console.log("CRN in session storage:", crn);
          console.log("agentId:", agentId);

          // Redirect to AgentInterface and pass the agent type
          navigate('/AgentInterface', { state: { agentType,name,agentId,phonenumber,crn } });
        } else {
          // Handle error fetching agent type
        }
      } else {
        // Handle agent login error
      }
    } catch (error) {
      // Handle general error
      setError('please enter the valid detials, try again');
      console.error('Login error:', error);
    }

  };

  const handleTruckOwnerLogin = () => {
    // Check if the login timestamp exists in local storage
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    if (loginTimestamp) {
      // Calculate the time difference in milliseconds
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - parseInt(loginTimestamp);
  
      // Define the time limit (24 hours in milliseconds)
      const timeLimit = 24 * 60 * 60 * 1000;
  
      // If the time difference is within the time limit, navigate to the owner interface
      if (timeDifference <= timeLimit) {
        const userCRN = sessionStorage.getItem('userCRN');
        const name = sessionStorage.getItem('name');
  
        navigate('/OwnerInterface', { state: { crn: userCRN, name } });
      } else {
        // The user needs to log in again since the time limit has passed
        togglePopup1();
      }
    } else {
      // The user has never logged in before, so they need to log in
      togglePopup1();
    }
  };
 

  const [inputValue, setInputValue] = useState('');
  const [msg, setMsg] = useState('');
  const [msgerror, setMsgerror] = useState('');


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue === '1') {
      setMsg('Success!');
      setTimeout(() => {
        setMsg('');
      }, 3000);
    } else  {
      setMsgerror('Error!');
      setTimeout(() => {
        setMsgerror('');
      }, 3000);
    }
  };

  const togglePopup1 = () => {
    setPopupVisible1(!popupVisible1);
  };

  const togglePopup2 = () => {
    setPopupVisible2(!popupVisible2);
  };
  const togglePopup3 = () => {
    setPopupVisible3(!popupVisible3);
  };

  const handleLogout = () => {
    // Clear local storage and navigate to the login page
    localStorage.removeItem('userCRN');
    sessionStorage.removeItem('phoneNumber');
    sessionStorage.removeItem('password');
    navigate('/login'); // Navigate to the login page
  };
  

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  return (
    <div>
 
    <div className='bg'>
    
    
<nav class="navbar navbar-expand-lg ">
    <a class="navbar-brand fw-bold" style={{ color:'white'}} href="#">LOGO</a>
    <button class="navbar-toggler bg-light bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-bs-controls="navbarNav" aria-bs-expanded="false" aria-bs-label="Toggle navigation">
        
        <MenuOutlinedIcon fontSize='large' />

    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
           
        </ul>
        <ul class="navbar-nav ml-auto">
        
            <li class="nav-itemmain ">
                <button class="nav-linkmain"  href="" style={{backgroundColor:'transparent',color:'white'}} onClick={togglePopup3}>Distance Calculator</button>
            </li>
            
          <li className='nav-itemmain'>
          <button className=' fw-bold' style={{backgroundColor:'transparent',color:'white'}} onClick={togglePopup2}>Agent Login</button>
          </li>
          <li class="nav-itemmain">
            <button className=' fw-bold' style={{backgroundColor:'transparent',color:'white'}} onClick={togglePopup1}>Truck Owner Login</button>
            </li>
    </ul>
    </div>
</nav>
{popupVisible3 && (
   <form className='mt-5 container'   id='distance-calculator'>
     <div style={{display:'flex',justifyContent:'end'}} ><span className="close-buttons mb-3"  onClick={togglePopup3}>&times;</span></div>
     <Typography variant='h4' bgcolor={'orange'} className='mb-3' sx={{textAlign:'center',borderRadius:'5px' }}>
            Distance Calculator
          </Typography>
   <Grid container spacing={2}>
       <Grid item xs={12} md={5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
           <TextField
               label="From Pincode"
               variant="outlined"
               name="toPincode"
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
               placeholder="Enter From Location"
               style={{ marginBottom: '8px' }}
               fullWidth
           />
           <TextField
               label="From Location"
               variant="outlined"
               name="fromLocation"
               id="fromLocation"
               placeholder="Enter To Location"
               fullWidth
           />
       </Grid>
       <Grid item xs={12} style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
       <Button variant="contained" className='mt-4 ps-5 pe-5 mb-4' data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >Submit
              </Button>
       </Grid>
   </Grid>
</form>
  )}
  
     
  <div class="collapse "   id="collapseExample" >
  
  <div class="card card-body container" style={{zIndex:'1',backgroundColor:"#f2f4fb"}}>
    
     
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
           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <div>
               <table class="table table-primary table-sm table-hover "  >
                 <tr>
                   <th>S.NO</th>
                   <th>Sub Location Name</th>
                   <th>Pincode</th>
                   <th>Distance In KMs</th>
                 </tr>
                 <tbody> 
                 <tr >
                   <td>1</td>
                   <td>abcdefdfdf</td>
                   <td>343535</td>
                   <td>5757km</td>
                 </tr>
                 <tr >
                   <td>2</td>
                   <td>abcdefdfdf</td>
                   <td>343535</td>
                   <td>5757km</td>
                 </tr>
                 <tr >
                   <td>3</td>
                   <td>abcdefdfdf</td>
                   <td>343535</td>
                   <td>5757km</td>
                 </tr>
                 <tr >
                   <td>4</td>
                   <td>abcdefdfdf</td>
                   <td>343535</td>
                   <td>5757km</td>
                 </tr>
                 </tbody>
               </table>
               <center> 
               <Button variant="contained" color='error' className='mt-4 ps-5 pe-5 mb-4 warning' data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >Clear
              </Button>
              </center>
             </div>
           </Typography>
  </div>
  
</div>

   <div className='photo'>  

    <div className="App">
     <center>
  <Typography style={{ paddingTop: '20px' }}>
    {msg && (
      <span style={{ 
        display: 'inline-block',
      }}>
              <Alert severity="success" className='p-4'>This is a {msg} alert — check it out!</Alert>

      </span>
    )}
     {msgerror && (
      <span style={{ 
        display: 'inline-block', 
      }}>
        <Alert severity="error" className='p-4'>This is a {msgerror} alert — check it out!</Alert>
      </span>
    )}
  </Typography>
</center>
{/* <div >
  <label>
    Enter value:
    <input type="text" value={inputValue} onChange={handleInputChange} />
  </label>
  <button onClick={handleSubmit}>Submit</button>
</div>  */}


      <div className="buttons-container1">
     

  
      </div>
      </div>
 
 

      {popupVisible1 && (
        
        <div className="popup-container1" id="popupSignIn">
 <div className="popup1">
  <div>
      <span className="close-button" onClick={togglePopup1}>&times;</span>
      <p><span><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></span></p>
      <h2 style={{fontFamily:'Segoe UI',textShadow:'1px 2px 2px gray',}}>Truck Owner Login</h2>
 </div>
 <br/>
       {error && <div className="error">{error}</div>}
    {message && <div className="message">{message}</div>}

      <input type="text"  id='lfelid' placeholder="Enter Phonenumber" inputMode='tel'  value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} required></input><br></br>
       <input type="password" id='lfelid'  placeholder="Enter Password" value={password} 
          onChange={(e) => setPassword(e.target.value)} required></input>
    
      <br/>
      <Button variant="contained" type='submit' className='mt-4 ps-5 pe-5 mb-2' onClick={handleLogin}>Submit</Button>
       <br/>
     <p style={{marginTop:'7px'}}><a href="#" className='' style={{fontFamily:'Segoe UI'}}>forgot password ?</a></p>
    </div>     
     </div>
      )}

      {popupVisible2 && (
        <div className="popup-container2" id="popupSignIn1">
<div className="popup1">
  <div className='head'>
      <span className="close-button" onClick={togglePopup2}>&times;</span>
      <p><span><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"   fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></span></p>
      <h2 style={{fontFamily:'Segoe UI',textShadow:'1px 2px 2px gray',}}>Agent Login</h2>
  </div>
  <br/>
      {error && <div className="error ms-2">{error}</div>}
    {message && <div className="message ms-2">{message}</div>}
 
       <input type="text" placeholder="Agent ID" inputMode='tel' id='lfelid' value={phonenumber} onChange={(e) =>  setPhoneNumber(e.target.value)} required></input><br></br>
       <input id='lfelid' type="password" placeholder="Enter Password"value={password}
          onChange={(e) => setPassword(e.target.value)}  required></input>
    
      <br/>
      <Button variant="contained" type='submit' className='mt-4 ps-5 pe-5 mb-2' onClick={handleLogin1}>Submit</Button>
         <br/>
     <p style={{marginTop:'7px'}}><a href="" style={{fontFamily:'Segoe UI',color:'blue'}}>forgot password ?</a></p>
    </div>        
    </div>
      )}
    </div>
    </div>
     
<div class="container-fulid mt-3 mb-3">
    <div class="card-container">
        
        <div class="card">
            <img src={img1} class="card-img-top" alt="Image 1"/>
        </div>
        <div class="card">
            <img src={img3} class="card-img-top" alt="Image 1"/>
        </div>
        <div class="card">
            <img src={img4} class="card-img-top" alt="Image 1"/>
        </div>
        <div class="card">
            <img src={img5} class="card-img-top" alt="Image 1"/>
        </div>
        <div class="card">
            <img src={img6} class="card-img-top" alt="Image 1"/>
        </div>
        <div class="card">
            <img src={img7} class="card-img-top" alt="Image 1"/>
        </div>
        <div class="card">
            <img src={img8} class="card-img-top" alt="Image 1"/>
        </div>
        <div class="card">
            <img src={img9} class="card-img-top" alt="Image 1"/>
        </div>
        <div class="card">
            <img src={img10} class="card-img-top" alt="Image 1"/>
        </div><div class="card">
            <img src={img2} class="card-img-top" alt="Image 1"/>
        </div>
    
        
    </div>
</div>

 



<div className="chat-iconmain  fa-4x" id="chatIcon">
  {/* <!-- Add your trigger item and hidden icons here -->/ */}

  <div class="trigger-item">
  <i className="bi bi-chat-dots-fill fa-lg">
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-chat-text" viewBox="0 0 16 16">
        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
        <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
      </svg>
    </i>
    <div class="hidden-icons">
       <a href="tel:123456789" ><i className="bi bi-phone"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-telephone-forward-fill" style={{color:'black'}} viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm10.761.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708z"/>
      </svg></i></a>
       <a href="https://wa.me/123456789"><i className="bi bi-whatsapp"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-whatsapp" style={{color:'black'}} viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
      </svg></i></a>
       <a href="mailto:info@example.com" ><i className="bi bi-envelope"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-envelope-at-fill" style={{color:'black'}} viewBox="0 0 16 16">
        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z"/>
        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z"/>
      </svg></i></a>
      {/* </div> */}
      {/* <!-- Add more icons as needed --> */}
    </div>
  </div>

</div>
     
    </div>

  );
}

export default  Dashboard;
