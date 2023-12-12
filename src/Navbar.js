import React from 'react'
import './Navbar.css';
import { Link, matchRoutes, useNavigate } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
export default function Navbar() {

  const navigate = useNavigate(); 
  const handleLogout = () => {
    // Clear local storage and navigate to the login page
    localStorage.removeItem('userCRN');
    sessionStorage.removeItem('phoneNumber');
    sessionStorage.removeItem('password');
    navigate('/login'); // Navigate to the login page
  };
  return ( 
    
    <div>
<nav class="navbar navbar-expand-lg ">
  <a class="navbar-brand" href="#">

         <a href="/AddSub" style={{textDecoration:'none',color:'white'}} className='homeinnav'>
    
Home</a>
  </a>
  <button class="navbar-toggler bg-primary p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <MenuOutlinedIcon fontSize='large' />
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">

    
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
      <ul className="navbar-list" style={{fontWeight:'bold',color:'white'}}>
          <li className="navbar-ite dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd"  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>   My Profile
            <div className="dropdown-content"style={{textDecoration:'none'}}>
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
      
       
       
    </div>
  )
}
