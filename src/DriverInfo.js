import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Driverinfo.css'
import OwnerNavbar from './OwnerNavbar';

const DriverInfo = () => {

  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [crn, setCRN] = useState('');
  const [driverName, setDriverName] = useState('');

  const [driverDetails, setDriverDetails] = useState([]);
  const [filteredDriverDetails, setFilteredDriverDetails] = useState([]);
  const [status, setTbrStatus] = useState(''); // Track TBR status
  const [tbr, setTBR] = useState(''); // Track entered TBR

  const crn = sessionStorage.getItem('userCRN');
  const phonenumber = sessionStorage.getItem('phoneNumber');

  useEffect(() => {
    fetchDriverData(crn);
  }, [crn]);

  const fetchDriverData = (crn) => {
    axios
      .get(`https://mynode.trucksbooking.in/fetchdriver?crn=${crn}`)
      .then((response) => {
        setDriverDetails(response.data);
        setFilteredDriverDetails(response.data);
        setDriverName(response.data[0].driverName);
        setPhoneNumber(response.data[0].phoneNumber);
        setTbrStatus(response.data[0].status);
        console.log(response.data[0].status)
      })
      .catch((error) => {
        console.error('Error fetching driver details:', error);
      });
  };
  useEffect(() => {
    const uniquePhoneNumbers = [...new Set(driverDetails.map((driver) => driver.phoneNumber))];
    setPhoneNumbers(uniquePhoneNumbers);
  }, [driverDetails]);

  const handleFetchDetails = () => {
    if (phoneNumber) {
      const filteredDrivers = driverDetails.filter((driver) => driver.phoneNumber === phoneNumber);
      setFilteredDriverDetails(filteredDrivers);
    } else {
      setFilteredDriverDetails(driverDetails);
    }
  };

  const handleSendMessage = async (driverId) => {
    try {
     
      // Send a PUT request to update driver's status by TBR number
      await axios.put(`http://3.109.145.125:9001/updatebookingstatus`, {
        tbr: tbr, // Include the tbr field in the request body
        driverphonenumber: phoneNumber,
        driverName, // Replace '<value>' with the actual driver name
        driverstatus: 'sent',
      });
      console.log(`Driver status updated:${tbr}`);
      console.log(`Driver status updated:${phoneNumber}`);


      // Send a PUT request to update booking's status by driver ID
      await axios.put(`http://3.109.145.125:9001/updatedriverstatus/${driverId}`, {

        status: 'sent',
      });
      await axios.post('http://3.109.145.125:9001/addnewrecord', {
        tbr,
        name:driverName,
        phonenumber:phoneNumber,
        crn,
        localDate: new Date().toLocaleString(), // Assuming localDate is the current date and time
      });
  
      // Update the TBR status in the state
      
  
      // Disable the input field and the Send button
     
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  const markDriverAvailable = (driverId) => {
    console.log(`Driver with ID ${driverId} is now available`);
  };

  return (
    <div >
      <OwnerNavbar/>
      
      <div className="container "  id='driverinfo'>
         
      <div style={{backgroundColor:'#e2eff1',paddingTop:'1px'}} className='shadow '>
       <h2 className="mt-5 txt" style={{fontFamily:'Segoe UI',textShadow:'1px 2px 2px gray',textAlign:'center'}}>Driver Info</h2>

        <div className="mb-4 ms-3" style={{display:'flex'}}>
          <div >
            <select
              className="form-control mt-5" style={{maxWidth:'240px'}} 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)} >
              <option value="">Select Phone Number</option>
              {phoneNumbers.map((phone) => (
                <option key={phone} value={phone}>
                  {phone}
                </option>
              ))}
            </select>
            </div>
            <div> 
            <button className="btn  bg-success text-light ms-3 mt-5"   onClick={handleFetchDetails}>
              Get Info
            </button>
            </div>
        </div>

<div style={{overflow:'hidden',overflowX:'scroll'}}> 
        <table className="table table-sm table-bordered" style={{ textAlign: 'center' }}>
          <thead className="thead" >
            <tr >
              <th style={{textAlign:'center',fontWeight:'normal'}} id='thead'>S.No</th>
              <th style={{textAlign:'center',fontWeight:'normal'}} id='thead'>Driver Name</th>
              <th style={{textAlign:'center',fontWeight:'normal'}} id='thead'>Phone Number</th>
              <th style={{textAlign:'center',fontWeight:'normal'}} id='thead'>Date of Joining</th>
              <th style={{textAlign:'center',fontWeight:'normal'}} id='thead'>TBR</th>
              <th style={{textAlign:'center',fontWeight:'normal'}} id='thead'>Send Driver</th>
              <th style={{textAlign:'center',fontWeight:'normal'}} id='thead'>Mark Available</th>
            </tr>
          </thead>
          <tbody>
            {filteredDriverDetails.length === 0 ? (
              <tr>
                <td colSpan="8" className='text-danger' style={{fontWeight:'bold'}}>No drivers found.</td>
              </tr>
            ) : (
              filteredDriverDetails.map((driver, index) => (
                <tr key={driver.id}>
                  <td>{index + 1}</td>
                  <td>{driver.driverName}</td>
                  <td>{driver.phoneNumber}</td>
                  <td>{driver.dateOfJoining}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter TBR"
                      value={tbr}
                      onChange={(e) => setTBR(e.target.value)}
                      disabled={status === 'sent'} // Disable input if TBR is sent
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSendMessage(driver.id)}
                      disabled={status === 'sent'} // Disable Send button if TBR is sent
                    >
                      Send
                    </button>
                  </td>
                  <td>
                    <button
                      className={`btn ${status === 'sent' ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => markDriverAvailable(driver.id)}
                    >
                      {status === 'sent' ? 'Not Available' : 'Available'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DriverInfo;
