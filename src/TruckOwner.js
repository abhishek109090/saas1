// OwnerTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './TruckOwner.css'
function TruckOwner() {
  const [ownerData, setOwnerData] = useState([]);
  const [feildcrn, setCRN] = useState(''); 
  const[agent,setAgentNumber]=useState('');
  const location=useLocation();
  useEffect(() => {
    if (location.state && location.state.feildcrn && location.state.phonenumber) {
      setCRN(location.state.feildcrn);
      setAgentNumber(location.state.phonenumber)
      console.log(location.state.feildcrn, location.state.phonenumber)
    }
  }, [location.state]);
  useEffect(() => {
    // Fetch owner data based on CRN
    if (feildcrn !== '') {
      axios.get(`http://3.109.145.125:9001/agentusers?feildcrn=${feildcrn}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setOwnerData(response.data);
          } else {
            console.error('Invalid data format received:', response.data);
          }
          console.log('Response data:', response.data);
        })
        .catch((error) => {
          console.error('Error fetching owner data:', error);
        });
    }
  }, [feildcrn]);
  return (
    <div className="container">
    <h1 className="text-center mt-5">Owner Data Table</h1>
    <table className="table table-bordered table-striped mt-4">
      <thead className="thead-dark">
        <tr>
          <th>S.No</th>
          <th>User Type</th>
          <th>Owner Name</th>
          <th>Phone Number</th>
          <th>Mandal</th>

          <th>District</th>
          <th>State</th>
          <th>Owner ID</th>

        </tr>
      </thead>
      <tbody>
        {ownerData.map((owner, index) => (
          <tr key={owner.id}>
            <td>{index + 1}</td>
            <td>{owner.userType}</td>
            <td>{owner.ownername}</td>
            <td>{owner.phonenumber}</td>

            <td>{owner.mandal}</td>
            <td>{owner.district}</td>
            <td>{owner.state}</td>
            <td>{owner.ownerId}</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default TruckOwner;
