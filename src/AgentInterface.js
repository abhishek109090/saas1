import React, { useState, useEffect } from 'react';
import './AgentInterface.css';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AgentNavbar from './AgentNavbar';
import { Modal, Carousel } from 'react-bootstrap';
import Alert from '@mui/material/Alert';

function AgentInterface() {
  const [trucks, setTrucks] = useState([]);
  const [selectedTruckImage, setSelectedTruckImage] = useState(null);
  const navigate = useNavigate();
  const [AgentshowSuccessMessage, AgentsetShowSuccessMessage] = useState(false);
  useEffect(() => {
  
    fetch(`https://mynode.trucksbooking.in/Trucks?crn=${crn}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Received truck data from backend:', data);
      
        const currentDateTime = new Date();
        const filteredTrucks = data.filter((truck) => {
          const truckDateTime = new Date(truck.date + ' ' + truck.time);
          return truckDateTime > currentDateTime;
        });
        setTrucks(filteredTrucks);
        console.log(filteredTrucks)
      })
      .catch((error) => console.error('Error fetching truck data:', error));
  }, []);
  useEffect(() => {
    // Check if the success message should be displayed
    const shouldDisplayMessage = sessionStorage.getItem('AgentSuccessMessage');
  
    if (shouldDisplayMessage) {
      // Display the success message
      AgentsetShowSuccessMessage(true);
      // Remove the flag from sessionStorage
      sessionStorage.removeItem('AgentSuccessMessage');
      // Automatically hide the message after 5 seconds
      setTimeout(() => {
        AgentsetShowSuccessMessage(false);
      }, 5000);
    }
  }, []);
  const location = useLocation();

  const agentType = sessionStorage.getItem('agentType')
  const name = sessionStorage.getItem('agentName')
  const agentId = sessionStorage.getItem('agentId')
  const phonenumber = sessionStorage.getItem('phoneNumber1')
  const crn = sessionStorage.getItem('agentCRN')


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


  const handleTruckImageClick = (truck) => {
    setSelectedTruckImage(truck);
  };

  const closeModal = () => {
    setSelectedTruckImage(null);
  };
console.log(selectedTruckImage)

  return (
    <div>
      <AgentNavbar agentName={name} agentCRN={crn} />
      {AgentshowSuccessMessage && (
        <div className="success-message mt-4 p-3" >
              <Alert severity="success" variant='filled'>
              <strong> Login Successful !</strong>

             </Alert>
        </div>
      )}
      <h1 className='txt mr-5' style={{ fontFamily: 'Segoe UI', textShadow: '1px 2px 2px gray', textAlign: "center" }}>Available Trucks</h1>
      <div className="container hii-10" style={{ minHeight: '100vh' }}>
        <div className="content-10">
          {trucks.map((truck) => (
            <div key={truck.id}>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th className="text-center align-middle col-12 col-lg-4" rowSpan="4">
                      <img
                        src={truck.rightsideUrl}
                        alt="Truck"
                        className="vehicle-image-10 img-fluid"
                        onClick={() => handleTruckImageClick(truck)}
                      />
                    </th>
                    <td className="col-12 col-lg-4">
                      Registration Number: {formatTruckNumber(truck.truckNumber)}
                    </td>
                    <td className="col-12 col-lg-4">
                      Truck Wheels: {truck.truckWheels}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Available Date: {truck.date.split('-').reverse().join('-')}
                    </td>
                    <td>
                      Time: {truck.time}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      From Location: {truck.from}
                    </td>
                    <td>
                      To Location: {truck.to}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Max Weight: {truck.truckMaxWeight}
                    </td>
                    <td>
                      <button type="button"
                        onClick={() => handleBookNowClick(truck)}
                        className="btn btn-primary book-button">
                        Book Now
                      </button>
                    </td>
                  </tr>
                  {/* ... (Other table rows) */}
                </tbody>
              </table>
              <br />
              <hr />
              <br />
            </div>
          ))}
        </div>
      </div>
      {/* Modal for Truck Image */}
      <Modal show={selectedTruckImage !== null} onHide={closeModal} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Truck Image</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Carousel>
      {selectedTruckImage && (
        <>
          {/* Log the URL outside of the Carousel.Item */}
          {console.log('Right Side Image URL:', selectedTruckImage.rightsideUrl)}

          {/* Display the image outside of Carousel.Item */}
          <img
            className="d-block w-100"
            src={selectedTruckImage.rightsideUrl}
            alt="Truck"
          />

          <Carousel.Item key="rightSideImage">
            {/* Log the URL inside of the Carousel.Item */}
            {console.log('Inside Carousel.Item:', selectedTruckImage.rightsideUrl)}

            {/* Display the image inside of Carousel.Item */}
            <img
              className="d-block w-100"
              src={selectedTruckImage.rightsideUrl}
              alt="Truck"
            />
          </Carousel.Item>

          {/* Add other images related to the selected truck */}
          <Carousel.Item key="leftSideImage">
            <img
              className="d-block w-100"
              src={selectedTruckImage.leftsideUrl}
              alt="Truck"
            />
          </Carousel.Item>
          {/* Add more images as needed */}
        </>
      )}
    </Carousel>
  </Modal.Body>
</Modal>
    </div>
  );
}

export default AgentInterface;
