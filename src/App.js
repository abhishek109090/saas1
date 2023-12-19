import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Login from './Login';
import TruckOwner from './TruckOwner';
import TruckVerification from './TruckVerification';
import OwnerRegistration from './OwnerRegistration';
import MainContent from './MainContent';
import VerifiedTruck from './VerifiedTruck';
import { BrowserRouter, Route, Routes,  useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user-related data from local storage
    localStorage.removeItem('name');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userCRN');

    // Navigate to the login page
    navigate('/');
  };

  return (
    <div style={{backgroundColor:'ghostwhite  ',width:'100%',height:'100vh'}}>
      <Header onLogout={handleLogout} />
      <Navbar />
      <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/MainContent" element={<MainContent />} />
          <Route path="/OwnerRegistration" element={<OwnerRegistration />} />
          <Route path="/TruckVerification" element={<TruckVerification />} />
          <Route path="/TruckOwner" element={<TruckOwner />} />
          <Route path="/VerifiedTruck" element={<VerifiedTruck />} />

        
      </Routes>
    </div>
  );
}

export default App;
