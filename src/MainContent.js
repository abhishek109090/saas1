import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './header.css'
const MainContent = () => {
  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);
  const [table3Data, setTable3Data] = useState([]);
  const feildcrn = sessionStorage.getItem('userCRN');

  useEffect(() => {
    // Fetch data from Table 1
    axios.get(`http://3.109.145.125:9001/table1?feildcrn=${feildcrn}`)
      .then((response) => {
        setTable1Data(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Table 1 data:', error);
      });

    // Fetch data from Table 2
    axios.get(`http://3.109.145.125:9001/table2?feildcrn=${feildcrn}`)
      .then((response) => {
        setTable2Data(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Table 2 data:', error);
      });

    // Fetch data from Table 3
    axios.get(`http://3.109.145.125:9001/table3?feildcrn=${feildcrn}`)
      .then((response) => {
        setTable3Data(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Table 3 data:', error);
      });
  }, [feildcrn]);

  // Filter data by status for Table 1
  const table1DataCompleted = table1Data.filter(item => item.status === 'Completed').length;
  const table1DataPending = table1Data.filter(item => item.status === 'pending').length;

  // Filter data by status for Table 2
  const table2DataCompleted = table2Data.filter(item => item.status === 'Completed').length;
  const table2DataPending = table2Data.filter(item => item.status === 'pending').length;


  // Filter data by status for Table 3
  const table3DataCompleted = table3Data.filter(item => item.status === 'Completed').length;
  const table2DataReject = table3Data.filter(item => item.status === 'Rejected').length;

  return (
    <div >
    <div className="container mt-5" >
      <h2 style={{textAlign:'center',fontWeight:'bold'}}>Daily Activity</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">My Truck Owners</h3>
              <p>Completed: {table1DataCompleted}</p>
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${(table1DataCompleted / 5) * 100}%` }}
                ></div>
              </div>
              <p>Pending: {table1DataPending}</p>
              <div className="progress">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${(table1DataPending / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Truks Verification</h3>
              <p>Completed: {table2DataCompleted}</p>
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${(table2DataCompleted / 5) * 100}%` }}
                ></div>
              </div>
              <p>Pending: {table2DataPending}</p>
              <div className="progress">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${(table2DataPending / 5) * 100}%` }}
                ></div>
              </div>
              
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Trucks verified</h3>
              <p>Completed: {table3DataCompleted}</p>
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${(table3DataCompleted / 5) * 100}%` }}
                ></div>
              </div>
              <p>Rejected: {table2DataReject}</p>
              <div className="progress">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${(table2DataReject / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  );
};

export default MainContent;
