import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [credentials, setCredentials] = useState({ phonenumber: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  const handleLogin = async () => {
    try {
      // Define the authentication endpoint URL
      const apiUrl = 'http://3.109.145.125:9001/authAgent';

      // Create a data object with the user's credentials
      const data = {
        phonenumber: credentials.phonenumber,
        password: credentials.password,
      };
      console.log(data)

      // Send a POST request to the API endpoint
      const response = await axios.post(apiUrl, data);
console.log(response)
      // Check the response status and handle accordingly
      if (response.status === 200) {
        // Successful login
        const userData = response.data.user;
 const token = response.data.token;
        if (userData && userData.crn) {
          const userCRN = userData.crn;
          const name=userData.name;
          const phoneNumber=userData.phonenumber
          console.log(userCRN)
          sessionStorage.setItem('userToken', token);
          // Store user CRN in localStorage
          sessionStorage.setItem('userCRN', userCRN);
          // sessionStorage.setItem('phoneNumber', phonenumber);
          // sessionStorage.setItem('password', password);
          sessionStorage.setItem('name', name);
          sessionStorage.setItem('phoneNumber', phoneNumber);
          console.log(token)

          console.log('Login successful');
          setMessage('Successful Login!');
          navigate('/MainContent', { state: { feildcrn: userCRN } });
        } else {
          // Handle missing CRN in the response
          setError('CRN not found in user data');
        }
      } else {
        // Handle login failure, e.g., show an error message.
        const data = response.data;
        setError(data.message || 'Login failed.');      }
    } catch (error) {
      // Handle any errors that occurred during the API call.
      setError('An error occurred. Please try again later.');
      console.error('Login error:', error);    }
  };
  

  return (
    <div className="login-container">
      <div className="blur-background"></div>
      <div className="login-popup">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-center">Login</h2>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="username" minLength={10}maxLength={10}
                      value={credentials.phonenumber}
                      onChange={(e) => setCredentials({ ...credentials, phonenumber: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                  </div>
                  <button className="btn btn-primary d-block mx-auto" onClick={handleLogin}>
                    Login
                  </button>
                  <center> {error && <div className="error">{error}</div>}
    {message && <div className="message">{message}</div>}</center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
