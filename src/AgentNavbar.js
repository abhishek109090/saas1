import React from 'react';
import './AgentNavbar.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import PropTypes from 'prop-types';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export default function AgentNavbar() {
  // Retrieve agentName and crn from sessionStorage
  const agentName = sessionStorage.getItem("agentName");
  const crn = sessionStorage.getItem("agentCRN");
  const phonenumber = sessionStorage.getItem("phoneNumber1");

  const navigate = useNavigate(); // Initialize useNavigate

  console.log("CRN in AgentNavbar:", crn);
  console.log("CRN in AgentNavbar:", phonenumber);

  // Function to handle navigation and pass crn as state
  const handleMyBookingClick = () => {
    // Navigate to the AgentBooking component and pass the crn in the state
    navigate("/AgentBooking", { state: { crn: crn,phonenumber: phonenumber } });
  };

  return (
    <div>
    {/* <nav className="navbar1">
      <div className="navbar-item">
        <li className="navbar-item1 dropdown1 fw-bold ">
          {agentName}
          <div className="dropdown-content1">
            <Link to="/AgentInterface">Home</Link>
            <Link to="#">My Profile</Link>
            <Link to="/Dashboard">Logout</Link>
          </div>
        </li>
      </div>
      <div className="navbar-item ">
        
        <div className="navbar-item ms-5 fw-bold">
          <Link to="/cal" style={{ color: 'black', textDecoration: 'none' }}>Distance Calculator</Link>
        </div>
        <div className="navbar-item ms-5">
          <button
            onClick={handleMyBookingClick}
            className="navbar-link1 fw-bold"
            style={{ backgroundColor: 'transparent', color: 'black' }}
          >
            My Booking
          </button>
        </div>
        <div className="navbar-item ms-5 ">
        <li className="navbar-item1 dropdown1 fw-bold">
          My Profile
          <div className="dropdown-content1">
           
            <Link to="#">My Profile</Link>
            <Link to="/Dashboard">Logout</Link>
          </div>
        </li>
      </div>
      </div>
    </nav> */}

    <nav class="navbar navbar-expand-lg p-0 " id='navbar1'>
  <div class="container">
  <li className="navbar-item1 hov dropdown1 fw-bold ">
          {agentName}
          <div className="dropdown-content1">
            <Link to="/AgentInterface">Home</Link>
            <Link to="#">My Profile</Link>
            <Link to="/Dashboard">Logout</Link>
          </div>
        </li>
        <button class="navbar-toggler bg-primary p-2 mr-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <MenuOutlinedIcon fontSize='large' />
  </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto ">
        
        <li class="nav-item me-5 hov" >
        <div className=" ms-2 fw-bold"  >
          <Link to="/cal" style={{ color: 'black', textDecoration: 'none' }}>Distance Calculator</Link>
        </div>
        </li>
        <li class="nav-item hov me-5">
        <button
            onClick={handleMyBookingClick}
            className="navbar-link1 fw-bold"
            style={{ backgroundColor: 'transparent', color: 'black' }}
          >
            My Booking
          </button>
        </li>
        <li class="nav-item hov ">
        <li className="dropdown1 fw-bold">
          My Profile
          <div className="dropdown-content1">
           
            <Link to="#">My Profile</Link>
            <Link to="/Dashboard">Logout</Link>
          </div>
        </li>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </div>
  
  );
}

AgentNavbar.propTypes = {
  crn: PropTypes.string.isRequired,
};
