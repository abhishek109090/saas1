import React, { useState, useEffect } from 'react';
import './TruckPostiing.css'


import Select from 'react-select';
import axios from 'axios';
import OwnerNavbar from './OwnerNavbar';
function TruckPosting() {
  
  const [showOtpField, setShowOtpField] = useState(false);
  const[dis, setDis] = useState(false);
 
  const [pricePerTonKm, setPricePerTonKm] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [registrationNumbers, setRegistrationNumbers] = useState('');
  const [selectedRegistrationNumber, setSelectedRegistrationNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [otp, setOtp] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showAll, setShowAll] = useState(false);

  const crn = sessionStorage.getItem('userCRN');
  console.log(crn)
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

  const [selectedSubLocations, setSelectedSubLocations] = useState([]);
  const [selectedSubLocations1, setSelectedSubLocations1] = useState([]);

  const fetchRegistrationNumbersByCRN = async () => {
  
    try {
      const response = await axios.get(`https://mynode.trucksbooking.in/truckNumber?crn=${crn}`);
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
  useEffect(() => {
    fetchRegistrationNumbersByCRN();
  }, []); 
 
  async function checkTruckPostStatus() {
    try {
      if (selectedRegistrationNumber && crn) {
        console.log(selectedRegistrationNumber, crn);
        const response = await axios.get(
          `https://mynode.trucksbooking.in/PostingStatus?crn=${crn}&truckNumber=${selectedRegistrationNumber}`
        );
  console.log(response.data)
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
        ton: '1',
        kilometer:'1',
        pricePerTonKm,
      crn,
      };

      axios
        .post('https://mynode.trucksbooking.in/Post', postData) // Replace with your actual API endpoint
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
        .post('https://mynode.trucksbooking.in/Post1', postData) // Replace with your actual API endpoint for the second table
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

    setDate('')
    setTime('')
    setOtp('')
    setRegistrationNumbers('')
    setSelectedSubLocations('')
    setSelectedSubLocations1('')
    setIsOtpVerified(false);
    setIsFormDisabled(true);
  }
  const tonValues = [10, 20, 30];
  const kilometerValues = [100, 200, 300];

  const calculateApproximatePrices = () => {
    if (!pricePerTonKm || isNaN(pricePerTonKm)) {
      // If the entered price is not a valid number, you can handle it here
      return [];
    }

    const price = parseFloat(pricePerTonKm);

    return tonValues.map((ton) => {
      return kilometerValues.map((kilometer) => {
        return {
          ton,
          kilometer,
          calculatedPrice: price * ton * kilometer,
        };
      });
    }).flat();
  };

  const renderApproximations = () => {
    const approximations = calculateApproximatePrices();
    const displayCount = showAll ? approximations.length : 2;

    return (
      <div>
        {approximations.slice(0, displayCount).map((approximation, index) => (
          <div key={index}>
            <p>
              For <span style={{ color: 'red' }}>{approximation.ton}T</span>  and <span style={{ color: 'red' }}>{approximation.kilometer}Km </span>, the price is approximately{' '}
              <span style={{ color: 'red' }}>{approximation.calculatedPrice} Rs.</span>
            </p>
          </div>
        ))}

        {approximations.length > 2 && (
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    );
  };
  return (
    <div >
      <OwnerNavbar/>
      <div className="container mt-4 mb-4 shadow hii-3" style={{
    maxWidth: '60%', // Set to 60% width by default
    margin: '0 auto', // Center the container
    '@media (max-width: 767px)': {
      maxWidth: '90%', // Set to 90% width on screens less than 768px wide (mobile view)
    },
  }}>
        <h1 className="text-center">Truck Posting</h1>

        <div className="row">
          <div className="col-md-6">
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

          <div className="col-md-6">
            <label htmlFor="otp">2. From Location</label>
            <select
              type="text"
              id="otp"
              className="form-control"
              value={from} disabled={dis}

              onChange={(e) => setFrom(e.target.value)}
            >
              <option value="">- Select From Location -</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <label> Loading Sublocation</label>
            <Select
              isMulti disabled={dis}

              value={selectedSubLocations}
              onChange={(selectedOptions) => setSelectedSubLocations(selectedOptions)}
              options={availableSubLocations.map((subLocation) => ({
                value: subLocation,
                label: subLocation,
              }))}
              placeholder="Select Loading Sub Locations"

            />
          </div>

          <div className="col-md-6">
            <label htmlFor="otp">3. To Location</label>
            <select
              type="text"
              id="otp"
              className="form-control"
              value={to}
              onChange={(e) => setTo(e.target.value)} disabled={dis}

            >
              <option value="">- Select To Location -</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <label> Unloading Sublocation</label>
            <Select
              isMulti disabled={dis}

              value={selectedSubLocations1}
              onChange={(selectedOptions) => setSelectedSubLocations1(selectedOptions)}
              options={availableSubLocations1.map((subLocation) => ({
                value: subLocation,
                label: subLocation,
              }))}
              placeholder="Select Unloading Sub Locations"

            />
          </div>

          <div className="col-md-6">
            <label htmlFor="date">4. Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              style={{ textTransform: 'uppercase' }}
              value={date}
              onChange={(e) => setDate(e.target.value)} disabled={dis}

              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="row mt-4">
  {/* First Field - Ton */}
  <div className="col-md-2">
    <label htmlFor="ton">Ton</label>
    <input
      type="text"
      className="form-control"
      id="ton"
      value='1 Ton'
     
      placeholder="Enter Ton"
      disabled
    />
  </div>

  {/* Second Field - Kilometer */}
  <div className="col-md-2">
    <label htmlFor="kilometer">Kilometer</label>
    <input
      type="text"
      className="form-control"
      id="kilometer"
      value='1 KM'
     
      disabled
    />
  </div>

  {/* Third Field - Total Kilometers */}
  <div className="col-md-2">
    <label htmlFor="totalKilometers">Price</label>
    <input
      type="text"
      className="form-control"
      id="totalKilometers"
      value={pricePerTonKm}
      onChange={(e) => setPricePerTonKm(e.target.value)}
      placeholder="Price per KM"
    />
    
  </div>

      
          <div className="col-md-6">

            <label htmlFor="time">5. Time</label>
            <input
              type="time"
              className="form-control"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)} disabled={dis}

              placeholder="Enter Number"
            />
          </div>

        </div>
        {renderApproximations()}

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


        <div className="row mt-4" style={{ maxWidth: '20%' }}>
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
                      padding: '10px 20px',
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

                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        padding: '10px 20px',
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
