import React, { useState,useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

import './AgentRegistration.css';
import OwnerNavbar from './OwnerNavbar';
export default function AgentRegistration() {
   const navigate = useNavigate('');
   const location = useLocation();
    const [agentType, setAgentType] = useState('');
    const [name, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [pancardNumber, setPancardNumber] = useState('');
    const [images, setImages] = useState({
      uploadAadhar: null,
      uploadPan: null,
    })
    const [doorNo, setDoorNo] = useState('');  
    const [street, setStreet] = useState('');
    const [landmark, setLandmark] = useState('');
    const [village, setVillage] = useState('');
    const [pincode, setPincode] = useState('');
    const [mandal, setMandal] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
       
      });
      const validateFileSize = (file, maxSizeInBytes) => {
        if (file && file.size > maxSizeInBytes) {
          return `File size should not exceed ${maxSizeInBytes / (1024 * 1024)} MB.`;
        }
        return '';
      };
    
      const validateForm = () => {
        const newErrors = {};
    
        if (!name) {
          newErrors.name = 'Please enter the owner name.';
        }
    
        if (!email) {
          newErrors.email = 'Please enter your email.';
        }
    
      
    
        if (!phonenumber) {
          newErrors.phonenumber = 'Please enter your phone number.';
        }
    
        // Add validation for other fields similarly
      
    
        if (!aadharNumber) {
          newErrors.aadharNumber = 'Please enter the Aadhar number.';
        }
    
        if (!pancardNumber) {
          newErrors.pancardNumber = 'Please enter the PAN card number.';
        }
    
        if (!doorNo) {
          newErrors.doorNo = 'Please enter the door number.';
        }
    
        if (!street) {
          newErrors.street = 'Please enter the street name.';
        }
    
        if (!landmark) {
          newErrors.landmark = 'Please enter the landmark.';
        }
    
        if (!village) {
          newErrors.village = 'Please enter the village name.';
        }
    
        if (!pincode) {
          newErrors.pincode = 'Please enter the pincode.';
        }
    
        if (!mandal) {
          newErrors.mandal = 'Please enter the mandal name.';
        }
    
        if (!district) {
          newErrors.district = 'Please enter the district name.';
        }
    
        if (!state) {
          newErrors.state = 'Please enter the state name.';
        }
   // Validate file sizes
   const maxSize = 15 * 1024 * 1024; // 15MB

   for (const key in images) {
     if (images[key]) {
       const errorMessage = validateFileSize(images[key], maxSize);
       if (errorMessage) {
         newErrors[key] = errorMessage;
       }
     }
   }

   setErrors(newErrors);
   return Object.keys(newErrors).length === 0;
 };
const crn = localStorage.getItem('userCRN')
console.log('fdf',crn)
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
          return;
        }
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('agentType', agentType);
        for (const key in images) {
          if (images[key]) {
            formData.append(key, images[key]);
          }
        }
        formData.append('phonenumber', phonenumber);
        formData.append('password', password);
     
        formData.append('aadharNumber', aadharNumber);
        formData.append('pancardNumber', pancardNumber);
        formData.append('doorNo', doorNo);
        formData.append('street', street);
        formData.append('landmark', landmark);
        formData.append('village', village);
        formData.append('pincode', pincode);
        formData.append('mandal', mandal);
        formData.append('district', district);
        formData.append('state', state);
        formData.append('crn', crn);
    
    
    
    
        axios
          .post('https://mynode.trucksbooking.in/Agent', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Important for sending files
            },
          })
          .then((response) => {
            console.log(response.data);
            alert('Your request is in process. Kindly check in agent info!');
            navigate('/OwnerInterface', { state: { crn } });
            // Handle success, e.g., display a success message
          })
          .catch((error) => {
            console.error(error);
            // Handle error, e.g., display an error message
          });
    
        // Reset form fields
        setName('');
        setEmail('');
        setPassword('');
    
    //   navigate('/Home')
        
      };
    return (
      <div>
      <OwnerNavbar/>
      <div className="hello-1"  >
          <div className="hii-1">
              
                  <h2  className='txt' style={{fontFamily:'Segoe UI',textShadow:'1px 2px 2px gray',textAlign:'center'}}>New Agent Registration</h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data"  >
                  <div className="grid-container-1" style={{marginLeft:'45px',}}>
                      <div>
                        <label>1. Agent Type</label>
                          <select
                              name="agentType" className="form-control" 
                              value={agentType}
                              style={{ textTransform: 'capitalize',borderRadius:'5px',maxWidth:'250px' }} 
                              onChange={(e) =>setAgentType(e.target.value)}
                              required 
                          >
                               <option value="">Select Agent Type</option> 
                              <option value="prepaid">1. Prepaid</option>
                              <option value="postpaid">2. Postpaid</option>
                              {/* <option value="Prepaid/Postpaid">3.Prepaid/Postpaid</option> */}
                          </select>
                          </div>
                          <div> <label htmlFor="text">2. Name</label>
                          <input type="text"className="form-control"  placeholder="Enter Name" id="ownerName" value={name}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                            setName(e.target.value);
                          }}
                              style={{ textTransform: 'capitalize' }} maxLength={40} required></input>
                              </div>
                              <div> <label htmlFor="text">3. Mobile Number</label>
                          <input type="text" className="form-control" value={phonenumber}
                             onInput={(e) => {
                              e.target.value = e.target.value.replace(/\D/g, ''); // Allow only digits
                              setPhoneNumber(e.target.value);
                            }} maxLength={10} minLength={10} placeholder="Enter Number" required /> {errors.phonenumber && <div className="text-danger">{errors.phonenumber}</div>}</div>
                      <div>
                         <label htmlFor="text">4. Email</label>
                          <input type="email" value={email}className="form-control" 
                            onChange={(e) => setEmail(e.target.value)} placeholder="@gmail.com" required />
                            {errors.email && <div className="text-danger">{errors.email}</
                            div>}</div>
                      <div><label htmlFor="text">5. Create Password</label>
                          <input type="password" value={password} className="form-control" 
                             onChange={(e) => setPassword(e.target.value)} placeholder="Create Password" required /></div>
                             <div> <label htmlFor="text">6. Aadhar Number</label>
                             <input type="text"  className="form-control" 
                                 value={aadharNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')} // Formats Aadhar Number with spaces
                                 onInput={(e) => {
                                   e.target.value = e.target.value.replace(/\D/g, ''); // Allow only digits
                                   setAadharNumber(e.target.value);
                                 }} maxLength={12} minLength={12} placeholder="Enter Aadhar Number" required /> {errors.aadharNumber && <div className="text-danger">{errors.aadharNumber}</div>}</div>
                      <div> <label htmlFor="text">7. Upload Aadhar Card</label>
                          <input type="file" className="form-control" 
                            onChange={(e) => setImages({ ...images, uploadAadhar: e.target.files[0] })} placeholder="" required />{errors['uploadAadhar'] && (
                              <span className="error">{errors['uploadAadhar']}</span>
                            )}</div>
                            <div> <label htmlFor="text">8. Pancard Number</label>
                            <input type="text" value={pancardNumber} 
                              onChange={(e) => {
                                const input = e.target.value;
                                const formattedInput = input
                                  .substring(0, 5)
                                  .toUpperCase().replace(/[^A-Z]/g, '') +
                                  input.substring(5).replace(/[^0-9]/g, '').substring(0, 4) +
                                  input.substring(9).toUpperCase().replace(/[^A-Z]/g, '');
            
                                setPancardNumber(formattedInput);
                              }} placeholder="Enter Pancard " maxLength={10} minLength={10} required />{errors.pancardNumber && <div className="text-danger">{errors.pancardNumber}</div>}</div>
                      <div>  
                        <label htmlFor="text">9. Upload Pancard</label>
                          <input type="file" className="form-control" 
                          onChange={(e) => setImages({ ...images, uploadPan: e.target.files[0] })}
                          placeholder="" required /> {errors['uploadPan'] && (
                            <span className="error">{errors['uploadPan']}</span>
                          )}</div>
                      <div><label htmlFor="text">10. Door No</label>
                          <input type="text" value={doorNo} className="form-control"  style={{ textTransform: 'capitalize' }}
                              onChange={(e) => setDoorNo(e.target.value)} placeholder="Door No" required />{errors.doorNo && <div className="text-danger">{errors.doorNo}</div>}</div>
                      <div><label htmlFor="text">11. Street</label>
                          <input type="text" value={street}className="form-control"  style={{ textTransform: 'capitalize' }}
                              onChange={(e) => setStreet(e.target.value)} placeholder="Street" required /> {errors.street && <div className="text-danger">{errors.street}</div>}</div>
                              <div><label htmlFor="text">12. Land Mark</label>
                              <input type="text" value={landmark}className="form-control"  style={{ textTransform: 'capitalize' }}
                                  onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                                    setLandmark(e.target.value);
                                  }} placeholder="Land Mark" required /> {errors.landmark && <div className="text-danger">{errors.landmark}</div>}</div>
                                  <div><label htmlFor="text">13. Village</label>
                                  <input type="text" value={village}  style={{ textTransform: 'capitalize' }}
                                     onInput={(e) => {
                                      e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                                      setVillage(e.target.value);
                                    }} placeholder="Village" required /> {errors.village && <div className="text-danger">{errors.village}</div>}</div>
                                    <div><label htmlFor="text">14. Pincode</label>
                                    <input type="text" value={pincode} className="form-control" 
                                       onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, ''); // Allow only digits
                                        setPincode(e.target.value);
                                      }}  minLength={6} maxLength={6} placeholder="Pincode" required /> {errors.pincode && <div className="text-danger">{errors.pincode}</div>}</div>
                                      <div><label htmlFor="text">15. Mandal</label>
                                      <input type="text" value={mandal} className="form-control"  style={{ textTransform: 'capitalize' }}
                                        onInput={(e) => {
                                          e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                                          setMandal(e.target.value);
                                        }} placeholder="Mandal" required /> {errors.mandal && <div className="text-danger">{errors.mandal}</div>}</div>
                                        <div><label htmlFor="text">16. District</label>
                                        <input type="text" value={district} className="form-control"   style={{ textTransform: 'capitalize' }}
                                          onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                                            setDistrict(e.target.value);
                                          }} placeholder="District" required /> {errors.district && <div className="text-danger">{errors.district}</div>}</div>
                                          <div><label htmlFor="text">17. State</label>
                                          <input type="text" value={state} className="form-control"  style={{ textTransform: 'capitalize' }}
                                              onInput={(e) => {
                                                e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                                                setState(e.target.value);
                                              }} placeholder="State" required /> {errors.state && <div className="text-danger">{errors.state}</div>}</div>
                                  </div>
                  {errors.name &&  <div className="text-danger">{errors.name}</div>}
                     <center> <button type="submit" className='btn   btn-primary mb-3 mt-2 p-2 ' style={{alignItems:'center',fontWeight:'bold',marginRight:'50px'}}>Submit</button></center>
              </form>
          </div>
      </div>
  </div>

    )
}
