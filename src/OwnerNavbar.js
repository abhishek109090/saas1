import React from 'react'
import { useNavigate } from 'react-router-dom';
import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
 

export default function OwnerNavbar() {
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
  return (
    <div>

 

        {/* <nav className="navbar navbar-expand-md" >
        <ul className="navbar-nav " >
         <li className='nav-item ' >
          <div className="numbered-button">
            <button className="navhome">
            <a href="OwnerInterface" style={{textDecoration:'none',color:'black'}}>Home</a>
            </button>
          </div>
          </li> 
        </ul>
        <button className="navbar-toggler text-white bg-info" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav">
    

 <li class="nav-item mt-2  "  >
      <li className="navbar-it dropdown" id='agent-button'>
     <span className=''>Agent</span>  
        <div className="dropdown-content" style={{width:'125px'}} >
        <li>
      <button className="centered-button7" onClick={navigateToAgentRegistration}>
                Agent Registration
  
                </button>
      </li>
    <li>
      <button className="centered-button7" onClick={agent} >
                 Agent Info
                </button>
      </li>
        </div>
      </li>
    
  </li>
 


 <li class="nav-item mt-2" id='driverbutton' >
      
      <li className="navbar-it dropdown" style={{color:'black',fontWeight:'bold'}}>
     <span className=''>Driver</span>  
        <div className="dropdown-content" style={{width:'125px'}} >
        <li> 

<button className="centered-button7" onClick={Driver}>
              Add New Driver
          
            </button>         
  </li>
<li>
<button className="centered-button7" onClick={Info} >
              Driver info
              
            </button>
  </li>
        </div>
      </li>
    
  </li>


 <li className="nav-item">
            <div className="numbered-button">
          
            <button className="centered-button4"onClick={Manage}>
        
        Manage Bookings
            </button>
          </div>
            </li>
            <li className="nav-item">
            <div className="numbered-button">
          
            <button className="centered-button2" onClick={newTruck}>
              Truck Registrations
            </button>
          </div>
            </li>
            
            <li className="nav-item">
            <div className="numbered-button">
        
            <button className="centered-button3" onClick={truckPosting}>
        
              Truck Posting
            </button>
          </div>
 
            </li>
        

            <li class="nav-item mt-2 ms-4" >
          <li className="navbar-it dropdown" style={{color:'black',fontWeight:'bold'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-person-circle " viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd"  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>  <span className=''>My Profile</span>  
            <div className="dropdown-content"  >
              <a href="#"style={{textDecoration:'none'}}>My Profile</a>
              <a href="OwnerInterface" style={{textDecoration:'none'}}>Home</a>
              <a href="Dashboard" onClick={handleLogout}style={{textDecoration:'none'}}>Logout</a>
            </div>
          </li>
        
      </li>
          </ul>
        </div>        
 </nav> */}

 <nav class="navbar navbar-expand-lg shadow-sm" style={{backgroundColor:'#f0f5f9'}} >
  <div class="container p-0">
  <a href="OwnerInterface" id='owneritems'   style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>Home</a>
    <button class="navbar-toggler bg-primary p-2"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <MenuOutlinedIcon fontSize='large' />
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto "  >
        <li class="nav-item " id='owneritems'   style={{marginTop:'2px',marginLeft:'50px'}}>
        <li className="navbar-it dropdown">
             <span className='fw-bold '>Agent</span>  
        <div className="dropdown-content" style={{width:'125px'}}>
        <li>
      <button className="centered-button7" onClick={navigateToAgentRegistration}>
                Agent Registration
                {/* <span className='childzoom'>Agent Registration</span>  */}
                </button>
      </li>
    <li>
      <button className="centered-button7" onClick={agent} >
                 Agent Info
                </button>
      </li>
        </div>
      </li>
        </li>
        <li class="nav-item " id='owneritems'   style={{marginTop:'2px',marginLeft:'50px'}}>
        <li className="navbar-it dropdown" style={{color:'black',fontWeight:'bold'}}>
     <span className='fw-bold '>Driver</span>  
        <div className="dropdown-content" style={{width:'125px'}} >
        <li> 
<button className="centered-button7" onClick={Driver}>
              Add New Driver
            </button>         
  </li>
<li>
<button className="centered-button7" onClick={Info} >
              Driver info
              
            </button>
  </li>
        </div>
      </li>
        </li>
        <li class="nav-item ml-5">
        <button className=" fw-bold" id='owneritems'  onClick={Manage}>
        {/* Manage Bookings */}
        Manage Bookings
            </button>
        </li>
        <li class="nav-item ml-5">
        <button className=" fw-bold "id='owneritems'   onClick={newTruck}>
              Truck Registrations
            </button>
        </li>
        <li class="nav-item">
        <button className=" fw-bold ml-5"  id='owneritems'   onClick={truckPosting}>
        Truck Posting
      </button>
        </li>
        <li class="nav-item ml-5" id='owneritems'  >
        <li className="navbar-it dropdown" style={{color:'black',fontWeight:'bold'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-person-circle " viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd"  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>  <span className=''>My Profile</span>  
            <div className="dropdown-content"  >
              <a href="#"style={{textDecoration:'none'}}>My Profile</a>
              <a href="OwnerInterface" style={{textDecoration:'none'}}>Home</a>
              <a href="Dashboard" onClick={handleLogout}style={{textDecoration:'none'}}>Logout</a>
            </div>
          </li>
        </li>
      </ul>
    </div>
  </div>
</nav>
      
    </div>
  )
}
