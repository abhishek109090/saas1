import React from 'react';
const Header = ({  onLogout }) => {
  const user = sessionStorage.getItem("name");

  const handleLogout = () => {
    // Perform logout actions, e.g., clearing user session
    onLogout();

    // Disable navigation using the browser's history API
    window.history.pushState(null, '', '/login'); // Replace '/login' with your login route
    window.onpopstate = () => {
      window.history.pushState(null, '', '/login');
    };
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3">
      <div className="d-flex align-items-center">
        <img src="logo.png" alt="Logo" />
        
      </div>
      <div className="ms-2" style={{float:'right'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>
          <span className="ms-2" style={{fontWeight:'bold'}}>{user}</span>
        </div>
      <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
