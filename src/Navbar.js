import React from 'react';
import { useNavigate } from 'react-router-dom';
import "jquery";
import "bootstrap/dist/js/bootstrap.js";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/css/bootstrap.css";

export default function Navbar() {
  const feildcrn = sessionStorage.getItem("userCRN");
  const phonenumber = sessionStorage.getItem("phoneNumber");
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate("/OwnerRegistration", { state: { feildcrn: feildcrn, phonenumber: phonenumber } });
  };
  
  const handleVerification = () => {
    navigate("/TruckVerification", { state: { feildcrn: feildcrn, phonenumber: phonenumber } });
  };
  
  const TruckOwner = () => {
    navigate("/TruckOwner", { state: { feildcrn: feildcrn, phonenumber: phonenumber } });
  };
  const TruckVerified = () => {
    navigate("/Verified", { state: { feildcrn: feildcrn, phonenumber: phonenumber } });
  };
  const handleHome = () => {
    navigate("/MainContent", { state: { feildcrn: feildcrn, phonenumber: phonenumber } });
  };
  return (
    <nav className="navbar navbar-expand-md navbar-white bg-dark ms-2 me-2">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
          <button className="nav-link text-info" onClick={handleHome}>Home</button>
          </li>
        </ul>
        <button className="navbar-toggler text-white bg-info" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto ms-3 me-3">
            <li className="nav-item">
              <button className="nav-link text-info" onClick={handleRegistration}>Owner Registration</button>
            </li>
            <li className="nav-item">
              <button className="nav-link text-info" onClick={TruckOwner}>My Truck Owners</button>
            </li>
            <li className="nav-item">
              <button className="nav-link text-info" onClick={handleVerification}>Truck Verification</button>
            </li>
            <li className="nav-item">
            <button className="nav-link text-info" onClick={TruckVerified}>Trucks Verified</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
