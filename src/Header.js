import React, { useState, useEffect } from 'react';
import './Drop.css';

const Header = ({ onLogout }) => {
  const user = sessionStorage.getItem("name");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Perform logout actions, e.g., clearing user session
    onLogout();

    // Disable navigation using the browser's history API
    window.history.pushState(null, '', '/login'); // Replace '/login' with your login route
    window.onpopstate = () => {
      window.history.pushState(null, '', '/login');
    };
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Check if the click occurred inside or outside the dropdown
      if (dropdownOpen && e.target.closest('.dropdown-container') === null) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [dropdownOpen]);

  const handleDropdownOptionClick = () => {
    // Close the dropdown when an option is clicked
    setDropdownOpen(false);
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3">
      <div className="d-flex align-items-center">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="me-2" style={{ float: 'right' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg>
        <span className="me-2" style={{ fontWeight: 'bold' }}>{user}</span>
      </div>
      <div className="dropdown-container">
        <div className={`dropdown ${dropdownOpen ? 'show' : ''}`}>
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            onClick={toggleDropdown}
          >
            My Account
          </button>
          <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
            <button className="dropdown-item me-2" onClick={handleDropdownOptionClick}>
              My Profile
            </button>
            <button className="dropdown-item" onClick={() => { handleLogout(); handleDropdownOptionClick(); }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
