import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TruckOwner';
import {  useLocation } from 'react-router-dom';

function Verified() {
  const [verifiedTrucks, setVerifiedTrucks] = useState([]);
  const location = useLocation();
  const [agentNumber, setAgentNumber] = useState('');
  const [feildcrn, setCRN] = useState(null);
  useEffect(() => {
    if (location.state && location.state.feildcrn && location.state.phonenumber) {
      setCRN(location.state.feildcrn);
      setAgentNumber(location.state.phonenumber)
      console.log(location.state.feildcrn, location.state.phonenumber)
    }
  }, [location.state]);
  useEffect(() => {
    // Fetch verified trucks with a status of 'completed'
    axios.get(`http://3.109.145.125:9001/verified?status=Completed&feildcrn=${feildcrn}`)
      .then((response) => {
        setVerifiedTrucks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching verified trucks:', error);
      });
  }, [feildcrn]);

  return (
    <div className="container">
    <h1 className="text-center mt-5">Verified Trucks Data Table</h1>
    {verifiedTrucks.length === 0 ? (
      <p className="text-center">No trucks verified</p>
    ) : (
      <table className="table table-bordered table-striped mt-4">
        <thead className="thead-dark">
          <tr>
            <th>S.No</th>
            <th>Truck Number</th>
            <th>Verification Date</th>
            <th>Max Weight</th>
            <th>Permit Validity</th>
            <th>Fitness Validity</th>
            <th>Pollution Certificate Validity</th>
            <th>Insurance Certificate Validity</th>
            <th>Verification Status</th>


            {/* Add other truck details columns */}
          </tr>
        </thead>
        <tbody>
          {verifiedTrucks.map((truck, index) => (
            <tr key={truck.id}>
              <td>{index + 1}</td>
              <td>{truck.truckNumber}</td>
              <td>{truck.verificationDate.split('-').reverse().join('-')}</td>
              <td>{truck.truckMaxWeight}</td>
              <td>{truck.truckPermitValidity}</td>
              <td>{truck.truckFitValidity}</td>
              <td>{truck.truckPollutionCertificateValidity}</td>
              <td>{truck.truckInsuranceCertificateValidity}</td>
              <td style={{color:'green',fontWeight:'bold'}}>{truck.status}</td>

            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  );
}

export default Verified;
