import React, { useState, useEffect } from 'react';
import './AgentInterface.css';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AgentNavbar from './AgentNavbar';


function AgentInterface() {
  const [trucks, setTrucks] = useState([]);
  
  const navigate = useNavigate();
  useEffect(() => {
  
    fetch(`http://3.109.145.125:9001/Trucks?crn=${crn}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Received truck data from backend:', data);
      
        const currentDateTime = new Date();
        const filteredTrucks = data.filter((truck) => {
          const truckDateTime = new Date(truck.date + ' ' + truck.time);
          return truckDateTime > currentDateTime;
        });
        setTrucks(filteredTrucks);
      })
      .catch((error) => console.error('Error fetching truck data:', error));
  }, []);
  const location = useLocation();
  const { agentType, name,agentId, phonenumber, crn } = location.state || {};

  
  console.log('Agent Type:', agentType);
  console.log('Agent name:', name);
  console.log('Agent name:', phonenumber);
  console.log('Agent name:', crn);
  console.log('Agent name:', agentId);

  useEffect(() => {

    const agentName = sessionStorage.getItem("agentName");

    if (!name) {
      
      navigate('/Dashboard');
    }
  }, [navigate]);
  const handleBookNowClick = (truckData) => {
    const truckDataToPass = {
      date: truckData.date,
      from: truckData.from,
      time: truckData.time,
      to: truckData.to,
      truckMaxWeight: truckData.truckMaxWeight,
      truckNumber: truckData.truckNumber,
      truckWheels: truckData.truckWheels,
      loadingSublocations: truckData.loadingSublocations,
      unloadingSublocations: truckData.unloadingSublocations,

    };
    const stateToPass = {
      truckData: truckDataToPass,
      agentType: agentType,
      name: name,
      agentId:agentId,
      phonenumber: phonenumber,
      crn: crn,
    };
    console.log(stateToPass)
    
    navigate('/AgentBooknow', { state: stateToPass });
  };
  function formatTruckNumber(truckNumber) {
    if (truckNumber && truckNumber.length >= 6) {
      const hiddenPart = '*'.repeat(6); 
      const visiblePart = truckNumber.slice(6); // Get the remaining characters
      return hiddenPart + visiblePart; 
    }
    return truckNumber;
  }


  


  return (
    <div>
  
      <AgentNavbar agentName={name} agentCRN={crn} />

        <h1 className='txt mr-5' style={{fontFamily:'Segoe UI',textShadow:'1px 2px 2px gray',textAlign:"center"}}>Avaliable Trucks</h1>
      <div className="container hii-10" style={{minHeight:'100vh'}}>
      
        <div className="content-10">
          {trucks.map((truck) => (
            <div key={truck.id}>
              <table className="table table-bordered">
                <tbody>
                <tr>
                    <th className="text-center align-middle col-2"   rowSpan="4" > {/* Adjust col-2 to your preference */}
                      <img
                        src={truck.rightsideUrl}
                        alt="Truck"
                        className="vehicle-image-10"
                      />
                    </th>
                    <td className="col-4"> {/* Adjust col-4 to your preference */}
                      Registration Number: {formatTruckNumber(truck.truckNumber)}
                    </td>
                    <td className="col-3"> {/* Adjust col-3 to your preference */}
                      Truck Wheels: {truck.truckWheels}
                    </td>
                  </tr>
                  <tr>
                    <td>Available Date: {truck.date.split('-').reverse().join('-')}</td>
                    <td>Time: {truck.time}</td>
                  </tr>
                  <tr>
                    <td>From Location: {truck.from}</td>
                    <td>To Location: {truck.to}</td>
                  </tr>
                  <tr>
                    <td>Max Weight: {truck.truckMaxWeight}</td>
                    <td>

                      <button type="button"
                        onClick={() => handleBookNowClick(truck)}
                        className="btn btn-primary book-button">
                        Book Now
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <hr />
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AgentInterface;
