import React, { useState, useEffect } from 'react';
import './TruckPostiing.css'
import { useLocation } from 'react-router-dom';

import Select from 'react-select';
import axios from 'axios';
import OwnerNavbar from './OwnerNavbar';
function TruckPosting() {
  const location = useLocation();
  const [showOtpField, setShowOtpField] = useState(false);
  const[dis, setDis] = useState(false);

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [registrationNumbers, setRegistrationNumbers] = useState('');
  const [selectedRegistrationNumber, setSelectedRegistrationNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [otp, setOtp] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [crn, setCRN] = useState('');

  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isTruckAlreadyPosted, setIsTruckAlreadyPosted] = useState(false);
  const availableSubLocations = [
    'Miyapur',
    'Kondapur',
    'Madhapur',
    // Add more sub-locations as needed
  ];
  const availableSubLocations1 = [
    'Solapur',
    'Bandra',
    'Jhodhpur',
    // Add more sub-locations as needed
  ];
  useEffect(() => {
    if (location.state && location.state.crn) {
      setCRN(location.state.crn);
      console.log('CRN:', location.state.crn);
      fetchRegistrationNumbersByCRN(location.state.crn);
    }
  }, [location.state]);  
 
  const [selectedSubLocations, setSelectedSubLocations] = useState([]);
  const [selectedSubLocations1, setSelectedSubLocations1] = useState([]);

  const fetchRegistrationNumbersByCRN = async (crn) => {
    try {
      const response = await axios.get(`http://3.109.145.125:9001/truckNumber?crn=${crn}`);
      if (Array.isArray(response.data)) {
        const completedTrucks = response.data.filter((truck) => truck.status === 'Completed');
        console.log(completedTrucks)
      setRegistrationNumbers(completedTrucks.map((truck) => truck.truckNumber));
      } else {
        setRegistrationNumbers([]); // If the response is not an array, set an empty array
      }
    } catch (error) {
      console.error('Error fetching registration numbers:', error);
      setRegistrationNumbers([]);
    }
  };
  
  // useEffect(() => {
  //   // Fetch truck post status based on the selected truck number
  //   async function checkTruckPostStatus() {
  //     try {
  //       const truckNumber= selectedRegistrationNumber;
  //       const response = await axios.get(`http://3.109.145.125/TruckPost/${truckNumber}`);
  //       if (response.data.isAllowed) {
  //         setIsTruckPostAllowed(true);
  //       } else {
  //         setIsTruckPostAllowed(false);
  //       }
  //     } catch (error) {
  //       console.error('Error checking truck post status:', error);
  //     }
  //   }

  //   if (selectedRegistrationNumber) {
  //     checkTruckPostStatus();
  //   }
  // }, [selectedRegistrationNumber]);
  async function checkTruckPostStatus() {
    try {
      if (selectedRegistrationNumber && crn) {
        console.log(selectedRegistrationNumber, crn);
        const response = await axios.get(
          `http://3.109.145.125:9001/PostingStatus?crn=${crn}&truckNumber=${selectedRegistrationNumber}`
        );
  
        if (response.data.canPost === false) {
          setIsTruckAlreadyPosted(true);
          alert(response.data.message);
          window.location.reload(); 
        } else {
          setIsTruckAlreadyPosted(false);
        }
      }
    } catch (error) {
      console.error('Error checking truck post status:', error);
    }
  }
  
  useEffect(() => {
    // Call the function to check truck post status when the selected truck number changes
    checkTruckPostStatus();
  }, [selectedRegistrationNumber]);


  const handleSendOtp = () => {
    // Check if all required fields have a value
    if (!selectedRegistrationNumber || !from || !to || !date || !time || !selectedSubLocations.length || !selectedSubLocations1.length) {
      alert('Please enter a value for all fields.');
    } else {
      const generatedOtp = '123456';
      setShowOtpField(true);
      setDis(true);
      console.log(`OTP Sent: ${generatedOtp}`);
    }
  };
  const handleVerifyOtp = () => {
    if (otp === '123456') {
      setIsOtpVerified(true);
      setIsFormDisabled(true); 
      alert('OTP Verified!');
    } else if (!setIsOtpVerified) {
      alert('Invalid OTP! Please try again.');
    } 
  };
  // useEffect(() => {
  //   async function checkTruckPostStatus() {
  //     try {
  //       if (selectedRegistrationNumber) {
  //         const response = await axios.get(`http://3.109.145.125/Posting/${selectedRegistrationNumber}`);
  //         if (response.data.isPosted) {
  //           // Truck has already been posted
  //           setIsTruckAlreadyPosted(true);
  //           alert('This truck has already been posted.');
  //         } else {
  //           setIsTruckAlreadyPosted(false);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error checking truck post status:', error);
  //     }
  //   }

  //   // Call the function to check truck post status when the selected truck number changes
  //   checkTruckPostStatus();
  // }, [selectedRegistrationNumber]);
  const handlePost = () => {
    if (isOtpVerified) {
      const loadingSublocations = selectedSubLocations.map((loc) => loc.value).join(', ');
      const unloadingSublocations = selectedSubLocations1.map((loc) => loc.value).join(', ');
      const postData = {
        truckNumber: selectedRegistrationNumber,
        date,
        time,
        from,
        to,
        loadingSublocations,
        unloadingSublocations,    
      crn,
      };

      axios
        .post('http://3.109.145.125:9001/Post', postData) // Replace with your actual API endpoint
        .then((response) => {
          const responseData = response.data;
          console.log(responseData);
          console.log(postData)
          alert('Truck posted successfully.');
        })
        .catch((error) => {
          console.error('Error posting data:', error);
          alert('Error posting data. Please try again.');
        });
        axios
        .post('http://3.109.145.125:9001/Post1', postData) // Replace with your actual API endpoint for the second table
        .then((response) => {
          const responseData = response.data;
          console.log(responseData);
        })
        .catch((error) => {
          console.error('Error posting data to the second table:', error);
          alert('Error posting data to the second table. Please try again.');
        });
      }else {
        alert('OTP not verified. Cannot post.');
      }
    setCRN('')
    setDate('')
    setTime('')
    setOtp('')
    setRegistrationNumbers('')
    setSelectedSubLocations('')
    setSelectedSubLocations1('')
    setIsOtpVerified(false);
    setIsFormDisabled(true);
  }

  return (
    <div>
    <OwnerNavbar />
    <div className="container mt-4 mb-4 shadow hii-3 " id='posting-width'>
      <h1 className="text-center mb-4">Truck Posting</h1>

      <div className="row">
        <div className="col-md-4">
          <label>1. Registration Number</label>
          <select
            value={selectedRegistrationNumber}
            className="form-control"
            onChange={(e) => setSelectedRegistrationNumber(e.target.value)}
            disabled={dis}
          >
            <option value="">- Select Registration Number -</option>
            {Array.isArray(registrationNumbers) ? (
              registrationNumbers.map((truckNumber) => (
                <option key={truckNumber} value={truckNumber}>
                  {truckNumber}
                </option>
              ))
            ) : (
              <option value="">No registration numbers available</option>
            )}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="otp">2. From Location</label>
          <select
            type="text"
            id="otp"
            className="form-control"
            value={from}            disabled={dis}

            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">- Select From Location -</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Karnataka">Karnataka</option>
          </select>
        </div>

     <div className='col-md-4'>
     <label> 3. Loading Sublocation</label>
          <Select
              isMulti             disabled={dis}

              value={selectedSubLocations}
              onChange={(selectedOptions) => setSelectedSubLocations(selectedOptions)}
              options={availableSubLocations.map((subLocation) => ({
                value: subLocation,
                label: subLocation,
              }))}
              placeholder="Select Loading Sub Locations"           

            />
      </div>
      </div>

      <div className="row mt-4">
        {/* <div className="col-md-4">
        <label> Loading Sublocation</label>
          <Select
              isMulti             disabled={dis}

              value={selectedSubLocations}
              onChange={(selectedOptions) => setSelectedSubLocations(selectedOptions)}
              options={availableSubLocations.map((subLocation) => ({
                value: subLocation,
                label: subLocation,
              }))}
              placeholder="Select Loading Sub Locations"           

            />
        </div> */}



        <div className="col-md-4">
        <label htmlFor="otp">4. To Location</label>
          <select
            type="text"
            id="otp"
            className="form-control"
            value={to}
            onChange={(e) => setTo(e.target.value)}            disabled={dis}

          >
            <option value="">- Select To Location -</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Karnataka">Karnataka</option>
          </select>
        </div>

        <div className="col-md-4">
        <label>5. Unloading Sublocation</label>
          <Select
            isMulti             disabled={dis}

            value={selectedSubLocations1}
            onChange={(selectedOptions) => setSelectedSubLocations1(selectedOptions)}
            options={availableSubLocations1.map((subLocation) => ({
              value: subLocation,
              label: subLocation,
            }))}
            placeholder="Select Unloading Sub Locations" />
        </div>
  
        <div className="col-md-4">
        <label htmlFor="date">6. Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            style={{ textTransform: 'uppercase' }}
            value={date}
            onChange={(e) => setDate(e.target.value)}            disabled={dis}
          />
        </div>
  

      </div>

      <div className="row mt-4">
        {/* <div className="col-md-6">
        <label> Unloading Sublocation</label>
          <Select
            isMulti             disabled={dis}

            value={selectedSubLocations1}
            onChange={(selectedOptions) => setSelectedSubLocations1(selectedOptions)}
            options={availableSubLocations1.map((subLocation) => ({
              value: subLocation,
              label: subLocation,
            }))}
            placeholder="Select Unloading Sub Locations" />
        </div> */}

        {/* <div className="col-md-6">
        <label htmlFor="date">4. Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            style={{ textTransform: 'uppercase' }}
            value={date}
            onChange={(e) => setDate(e.target.value)}            disabled={dis}

            placeholder="Enter Name"
          />
        </div> */}
      </div>
      <div className="row ">
      <div className="col-md-4">
        
      <label htmlFor="time">7. Time</label>
          <input
            type="time"
            className="form-control"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}            disabled={dis}

            placeholder="Enter Number"
          />
      </div>

      </div>
      {showOtpField && (
        <div className="row mt-4">
          <div className="col-md-6">
            <label htmlFor="otp">6. OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              className="form-control"
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              disabled={isFormDisabled}
            />
          </div>
        </div>
      )}

     <div className="row mt-4 me-5 " id='truck-send-otp'  style={{maxWidth:'20%'}}>
        <div className="col-md-12">
          <div className="grid-container-3">
            {!isOtpVerified ? (
              <div className="flex-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={showOtpField ? handleVerifyOtp : handleSendOtp}
                  disabled={isFormDisabled}
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    padding: '10px 15px',
                    transition: 'background-color 0.3s, color 0.3s',
                  }}
                >
                  {showOtpField ? 'Verify OTP' : 'Send OTP'}
                </button>
              </div>
            ) : (
              <div className="flex-2">
                {!isTruckAlreadyPosted ? (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handlePost}
                    disabled={isFormDisabled}
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      padding: '10px 15px',
                      transition: 'background-color 0.3s, color 0.3s',
                    }}
                  >
                    Post
                  </button>
                ) : (
                  <p className="flex-2 btn btn-secondary">
                    Truck Already Posted
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  </div>
  );
}

export default TruckPosting;
