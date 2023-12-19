import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './verify.css'
function TruckVerification() {
  const [truckData, setTruckData] = useState([]);
  const navigate = useNavigate('');
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
    if (feildcrn) {
      console.log(feildcrn)
      // Fetch truck data based on CRN from the server
      axios.get(`http://3.109.145.125:9001/truckverify?feildcrn=${feildcrn}`)
        .then((response) => {
          setTruckData(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching truck data:', error);
        });
    }
  }, [feildcrn]);
  const handleVerify = (truckId) => {
    const currentDate  = new Date();
    const verificationDate = currentDate.toISOString().split('T')[0];
    // Send a request to update the status to "Completed" for the given truck
    axios.put(`http://3.109.145.125:9001/truckUpdate/${truckId}`, { status: 'Completed', verificationDate: verificationDate })
      .then((response) => {
        // Update the status in the frontend
        const updatedTruckData = truckData.map((truck) => {
          if (truck.id === truckId) {
            return { ...truck, status: 'Completed', verificationDate: verificationDate };
          }
          return truck;
        });
        setTruckData(updatedTruckData);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  const handleReject = (truckId) => {
    // Send a request to update the status to "Rejected" for the given truck
    axios.put(`http://3.109.145.125:9001/truckUpdate/${truckId}`, { status: 'Rejected' })
      .then((response) => {
        // Update the status in the frontend
        const updatedTruckData = truckData.map((truck) => {
          if (truck.id === truckId) {
            return { ...truck, status: 'Rejected' };
          }
          return truck;
        });
        setTruckData(updatedTruckData);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  const pendingTrucks = truckData.filter(truck => truck.status === 'pending');

  return (
    <div className="container mt-4">
    <h1>Truck Details</h1>
    {truckData.length === 0 ? (
      <div>No pending trucks for verification.</div>
    ) : (
      truckData.map((truck, index) => (
        <div className="accordion" key={index}>
          <div className="accordion-item">
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={truck.status === 'pending' ? 'false' : 'true'}
                aria-controls={`collapse${index}`}
              >
                <div className="desktop-view">
                  Owner Name:
                  <b style={{ color: 'red', marginLeft: '1%', marginRight: '1%' }}>{truck.name}</b> | Truck Number:
                  <b style={{ color: 'red', marginLeft: '1%', marginRight: '1%' }}>{truck.truckNumber}</b> | Date Of Request:
                  <b style={{ color: 'red', marginLeft: '1%', marginRight: '1%' }}>{truck.date}</b> |{' '}
                  <b style={{ color: truck.status === 'pending' ? 'orange' : truck.status === 'Completed' ? 'green' : 'red' }}>
  {truck.status === 'pending' ? ' Truck Verification Pending ' : truck.status === 'Completed' ? 'Verification Completed' : 'Truck Verification Rejected'}
</b>

                </div>
                <div className="mobile-view">
                  <p>
                    Owner Name: <b>{truck.name}</b>
                  </p>
                  <b style={{ color: truck.status === 'pending' ? 'orange' : truck.status === 'Completed' ? 'green' : 'red' }}>
                  {truck.status === 'pending' ? ' Truck Verification Pending ' : truck.status === 'Completed' ? 'Verification Completed' : 'Truck Verification Rejected'}
                  </b>
                </div>
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="desktop-view">
                  <div className="row">
                    <div className="col-md-6">
                      <p>Max Weight: {truck.truckMaxWeight}</p>
                    </div>
                    <div className="col-md-6">
                      <p>Permit Validity: {truck.truckPermitValidity}</p>
                    </div>
                  
                  </div>
                  <div className="row">
          <div className="col-md-6">
            <p>Fit Validity: {truck.truckFitValidity}</p>
          </div>
          <div className="col-md-6">
            <p>Pollution Certificate Validity: {truck.truckPollutionCertificateValidity}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>Insurance Certificate Validity: {truck.truckInsuranceCertificateValidity}</p>
          </div>
          
          
  <div className="row">
    <div className="col-md-6">
      <img src={truck.uploadRegistrationUrl} alt={`Truck ${truck.truckNumber} Registration`} className="image-in-field"/><br></br> 
      <b>Truck Registration certificate</b>
    </div>
    <div className="col-md-6">
    <img src={truck.truckFrontSideWithNumberPlateUrl} alt={`Truck ${truck.truckNumber} Front Side`} className="image-in-field"/><br></br> 
      <b>Truck Front Side With Number Plate</b>
    </div>
  </div>
  <div className="row">
    <div className="col-md-6">
      <img src={truck.rightsideUrl} alt={`Truck ${truck.truckNumber} Registration`} className="image-in-field"/><br></br> 
      <b>Truck Right Side Photo</b>
    </div>
    <div className="col-md-6">
    <img src={truck.leftsideUrl} alt={`Truck ${truck.truckNumber} Front Side`} className="image-in-field"/><br></br> 
      <b>Truck Left Side Photo</b>
    </div>
  </div>
  <div className="row">
    <div className="col-md-6">
    <img src={truck.truckBackSideWithNumberPlateUrl} alt={`Truck ${truck.truckNumber} Back Side`}className="image-in-field" /><br></br> 
      <b>Truck Back Side With Number Plate</b>
    </div>
    <div className="col-md-6">
    <img src={truck.truckCabinUrl} alt={`Truck ${truck.truckNumber} Cabin`} className="image-in-field"/><br></br> 
      <b>Truck Cabin</b>

    </div>
  </div>
  <div className="row">
    <div className="col-md-6">
    <img src={truck.truckOdometerUrl} alt={`Truck ${truck.truckNumber} Odometer`} className="image-in-field"/><br></br> 
      <b>Truck Odometer</b>
    </div>
    <div className="col-md-6">
    <img src={truck.truckPermitUrl} alt={`Truck ${truck.truckNumber} Permit`} className="image-in-field"/><br></br> 
      <b>Truck Permit</b>
    </div>
  </div>
  <div className="row">
    <div className="col-md-6">
    <img src={truck.truckFitUrl} alt={`Truck ${truck.truckNumber} Fit`} className="image-in-field"/><br></br> 
      <b>Truck Fitness</b>
    </div>
    <div className="col-md-6">
    <img src={truck.truckPollutionCertificateUrl} alt={`Truck ${truck.truckNumber} Pollution Certificate`}className="image-in-field" /> <br></br> 
      <b>Truck Pollution</b>   </div>
  </div> <div className="row">
    <div className="col-md-6">
    <img src={truck.truckInsuranceCertificateUrl} alt={`Truck ${truck.truckNumber} Insurance Certificate`} className="image-in-field"/><br></br> 
      <b>Truck Insurance</b>
    </div>
    <div className="col-md-6">
    <img src={truck.truckOwnerPassportSizePhotoUrl} alt={`Truck ${truck.truckNumber} Owner Passport Size Photo`} className="image-in-field"/><br></br> 
      <b>Truck Owner Passport Size Photo</b>    </div>
  </div> <div className="row">
    <div className="col-md-6">
    <video src={truck.truckVideoUrl} alt={`Truck ${truck.truckNumber} Odometer`} className="image-in-field" controls/><br></br> 
      <b>Truck Video</b>
    </div>
    
  </div>
</div>
                </div>
                <div className="mobile-view">
        <p>Owner Name:{truck.name}</p>
        <p>Date Of Request:{truck.date}</p>
        <p>Max Weight: {truck.truckMaxWeight}</p>
        <p>Permit Validity: {truck.truckPermitValidity}</p>
        <p>Fit Validity: {truck.truckFitValidity}</p>
        <p>Pollution Certificate Validity: {truck.truckPollutionCertificateValidity}</p>
        <p>Insurance Certificate Validity: {truck.truckInsuranceCertificateValidity}</p>
        <img src={truck.uploadRegistrationUrl} alt={`Truck ${truck.truckNumber} Registration`} className="image-in-field"/><br></br> 
      <b>Truck Registration certificate</b>  <br></br> 
      <img src={truck.truckFrontSideWithNumberPlateUrl} alt={`Truck ${truck.truckNumber} Front Side`} className="image-in-field"/><br></br> 
      <b>Truck Front Side With Number Plate</b>   <br></br> 
      <img src={truck.truckBackSideWithNumberPlateUrl} alt={`Truck ${truck.truckNumber} Back Side`}className="image-in-field" /><br></br> 
      <b>Truck Back Side With Number Plate</b><br></br> 
      <img src={truck.truckCabinUrl} alt={`Truck ${truck.truckNumber} Cabin`} className="image-in-field"/><br></br> 
      <b>Truck Cabin</b><br></br> 
      <img src={truck.truckOdometerUrl} alt={`Truck ${truck.truckNumber} Odometer`} className="image-in-field"/><br></br> 
      <b>Truck Odometer</b><br></br> 
      <img src={truck.truckPermitUrl} alt={`Truck ${truck.truckNumber} Permit`} className="image-in-field"/><br></br> 
      <b>Truck Permit</b><br></br> 
      <img src={truck.truckFitUrl} alt={`Truck ${truck.truckNumber} Fit`} className="image-in-field"/><br></br> 
      <b>Truck Fitness</b><br></br> 
      <img src={truck.truckPollutionCertificateUrl} alt={`Truck ${truck.truckNumber} Pollution Certificate`}className="image-in-field" /> <br></br> 
      <b>Truck Pollution</b>  <br></br>  
      <img src={truck.truckInsuranceCertificateUrl} alt={`Truck ${truck.truckNumber} Insurance Certificate`} className="image-in-field"/><br></br> 
      <b>Truck Insurance</b><br></br> 
      <img src={truck.truckOwnerPassportSizePhotoUrl} alt={`Truck ${truck.truckNumber} Owner Passport Size Photo`} className="image-in-field"/><br></br> 
      <b>Truck Owner Passport Size Photo</b>   <br></br> 
      <video src={truck.truckVideoUrl} alt={`Truck ${truck.truckNumber} Odometer`} className="image-in-field"/><br></br> 
      <b>Truck Video</b><br></br> 

       </div>
              </div>
              {truck.status === 'pending' ? (
            <div className="buttons">
              <button className="btn btn-success ms-3"onClick={() => handleVerify(truck.id)}>Verify Now</button>
              <button className="btn btn-danger ms-3"onClick={() => handleReject(truck.id)}>Reject</button>
            </div>
          ) : null}
            </div>
            
          </div>
         
        </div>
      ))
    )}
  </div>
  );
}

export default TruckVerification;



