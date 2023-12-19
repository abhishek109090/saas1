import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import emailjs from 'emailjs-com';
import './Registration.css';
export default function AgentRegistration() {
  const navigate = useNavigate('');
  const location = useLocation();
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [agentNumber, setAgentNumber] = useState('');

  const [phonenumber, setPhoneNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [holderName, setHolderName] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
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
  const [feildcrn, setCRN] = useState(null);
  const [sendOtp, setSendOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [randomOtp, setRandomOtp] = useState(null);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',

  });
  const handleSendOtp = () => {
    if (validateForm()) {
      // Generate a random 4-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000);
      setRandomOtp(generatedOtp.toString());
      console.log(generatedOtp)
      // Send the OTP via email
      emailjs
        .send(
          'service_qucoi14',
          'template_3wveuz6',
          { otp: generatedOtp },
          {email:email},
          'q5nhqMCBFfD5LBjv9'
        )
        .then(
          (result) => {
            console.log(result.text);
            window.alert('OTP sent successfully.');
          },
          (error) => {
            console.log(error.text);
            window.alert('Error sending OTP.');
          }
        );
      // Store the generated OTP
      setRandomOtp(generatedOtp)
      setOtp(''); // Clear the previous OTP input
      setSendOtp(true);
    }
  };

  const handleVerifyOtp = () => {
    // You can implement OTP verification here.
    // For now, we'll just check if the entered OTP matches the generated OTP.
    if (parseInt(otp) === randomOtp) {
      setVerifyOtp(true);
    } else {
      alert('OTP verification failed. Please try again.');
    }
  };
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

    if (!userType) {
      newErrors.userType = 'Please select a user type.';
    }

    if (!phonenumber) {
      newErrors.phonenumber = 'Please enter your phone number.';
    }

    // Add validation for other fields similarly
    if (!bankName) {
      newErrors.bankName = 'Please enter the bank name.';
    }

    if (!holderName) {
      newErrors.holderName = 'Please enter the account holder name.';
    }

    if (!accNumber) {
      newErrors.accNumber = 'Please enter the account number.';
    }

    if (!bankIfsc) {
      newErrors.bankIfsc = 'Please enter the bank IFSC.';
    }

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

  useEffect(() => {
    if (location.state && location.state.feildcrn && location.state.phonenumber) {
      setCRN(location.state.feildcrn);
      setAgentNumber(location.state.phonenumber)
      console.log(location.state.feildcrn, location.state.phonenumber)
    }
  }, [location.state]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('userType', userType);
    for (const key in images) {
      if (images[key]) {
        formData.append(key, images[key]);
      }
    }
    formData.append('phonenumber', phonenumber);
    formData.append('password', '1122334455');
    formData.append('agentNumber', agentNumber);
    formData.append('bankName', bankName);
    formData.append('holderName', holderName);
    formData.append('accNumber', accNumber);
    formData.append('bankIfsc', bankIfsc);
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
    formData.append('feildcrn', feildcrn);




    axios
      .post('http://3.109.145.125:9000/Owner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for sending files
        },
      })
      .then((response) => {
        console.log(response.data);
        alert('Your request is in process. Kindly check in agent info!');
        navigate('/MainContent', { state: { feildcrn } });
        // Handle success, e.g., display a success message
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., display an error message
      });

    // Reset form fields

    // ... Clear other fields
  };

  return (
    <div>
      <div className="hello-1">

        <div className="hii-1">
          <center>
            <h1>New Owner Registration</h1></center>
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <div className="grid-container-1">
              <div><label>1. Owner Name</label>
                <input type="text" placeholder="Enter Name" value={name}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                    setName(e.target.value);
                  }} className="form-control"
                  style={{ textTransform: 'capitalize' }} maxLength={40}
                  required></input>
                {errors.name && <div className="text-danger">{errors.name}</div>}

              </div>

              <div> <label htmlFor="text">2. Email</label>
                <input type="email" value={email}
                  className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email@gmail.com" required />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
              <div> <label className="form-label">3. Owner Type</label>
                <select
                  className=" form-control"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Owner Type
                  </option>
                  <option value="Self">Self</option>
                  <option value="Organization">Organization</option>
                </select>
                {errors.userType && <div className="text-danger">{errors.userType}</div>}
              </div>
              <div>
                <label htmlFor="number">4. Phone number</label>
                <input
                  type="tel" // Use type="tel" to specify it's a telephone number input
                  value={phonenumber}
                  className="form-control mt-3"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, ''); // Allow only digits
                    setPhoneNumber(e.target.value);
                  }}
                  placeholder="Enter Phone number"
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]{10}" // Use a regular expression pattern to restrict to 10 digits
                  required
                />
                {errors.phonenumber && <div className="text-danger">{errors.phonenumber}</div>}
              </div>

              <div><label htmlFor="text">5. Password</label>
                <input type="password" value='1122334455'
                  disabled
                  className="form-control" placeholder="Create Password" required />
              </div>
              <div> <label htmlFor="text">6. Bank Name</label>
                <input type="text" value={bankName} style={{ textTransform: 'capitalize' }} maxLength={40}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                    setBankName(e.target.value);
                  }} placeholder="Enter Holder Name"
                  className="form-control" required />                              {errors.bankName && <div className="text-danger">{errors.bankName}</div>}
              </div>
              <div> <label htmlFor="text">7. Account Holder Name</label>
                <input type="text" value={holderName} style={{ textTransform: 'capitalize' }} maxLength={40}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                    setHolderName(e.target.value);
                  }} placeholder="" pattern="^[A-Z][a-z]*(?: [A-Z][a-z]*){0,4}$"
                  className="form-control" title="Account Holder Name must start with an uppercase letter, followed by lowercase letters and spaces."
                  required />                              {errors.holderName && <div className="text-danger">{errors.holderName}</div>}
              </div>
              <div> <label htmlFor="text">8. Bank Account Number</label>
                <input type="text" value={accNumber}
                  className="form-control" onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, ''); // Allow only digits
                    setAccNumber(e.target.value);
                  }} placeholder="" required />                              {errors.accNumber && <div className="text-danger">{errors.accNumber}</div>}
              </div>
              <div> <label htmlFor="text">9. IFSC Code</label>
                <input type="text" value={bankIfsc}
                  className="form-control" onChange={(e) => setBankIfsc(e.target.value)} placeholder="Enter IFSC " required />                              {errors.bankIfsc && <div className="text-danger">{errors.bankIfsc}</div>}
              </div>
              <div> <label htmlFor="text">10. Aadhar Number </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="XXXX XXXX XXXX"
                  value={aadharNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')} // Formats Aadhar Number with spaces
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, ''); // Allow only digits
                    setAadharNumber(e.target.value);
                  }}
                  minLength={14} maxLength={14}

                  required
                />                              {errors.aadharNumber && <div className="text-danger">{errors.aadharNumber}</div>}
              </div>
              <div>  <label htmlFor="text">11. Upload Aadhar Card</label>
                <input type="file"
                  className="form-control"
                  onChange={(e) => setImages({ ...images, uploadAadhar: e.target.files[0] })}
                  placeholder="" required />
                {errors['uploadAadhar'] && (
                  <span className="error">{errors['uploadAadhar']}</span>
                )}</div>
              <div>
                <label htmlFor="text">12. PAN Number</label>
                <input
                  type="text"
                  value={pancardNumber}
                  onChange={(e) => {
                    const input = e.target.value;
                    const formattedInput = input
                      .substring(0, 5) 
                      .toUpperCase() .replace(/[^A-Z]/g, '')+ 
                      input.substring(5).replace(/[^0-9]/g, '').substring(0, 4) + 
                      input.substring(9).toUpperCase().replace(/[^A-Z]/g, ''); 

                    setPancardNumber(formattedInput);
                  }}
                  placeholder="Enter PAN Card" minLength={10}maxLength={10}
                  required
                />
                {errors.pancardNumber && <div className="text-danger">{errors.pancardNumber}</div>}
              </div>


              <div>  <label htmlFor="text">13. Upload PAN Card</label>
                <input type="file"
                  className="form-control" onChange={(e) => setImages({ ...images, uploadPan: e.target.files[0] })}
                  placeholder="" required />
                {errors['uploadPan'] && (
                  <span className="error">{errors['uploadPan']}</span>
                )}
              </div>
              <div><label htmlFor="text">14. Door No</label>
                <input type="text" value={doorNo} style={{ textTransform: 'capitalize' }}
                  className="form-control" onChange={(e) => setDoorNo(e.target.value)}
                  placeholder="Door No" required />                              {errors.doorNo && <div className="text-danger">{errors.doorNo}</div>}
              </div>
              <div><label htmlFor="text">15. Street</label>
                <input type="text" value={street} style={{ textTransform: 'capitalize' }}
                  className="form-control" onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                    setStreet(e.target.value);
                  }} placeholder="Street" required />                              {errors.street && <div className="text-danger">{errors.street}</div>}
              </div>
              <div><label htmlFor="text">16. Land Mark</label>
                <input type="text" value={landmark} style={{ textTransform: 'capitalize' }}
                  className="form-control" onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                    setLandmark(e.target.value);
                  }} placeholder="Land Mark" required />                              {errors.landmark && <div className="text-danger">{errors.landmark}</div>}
              </div>
              <div><label htmlFor="text">17. Village</label>
                <input type="text" value={village} style={{ textTransform: 'capitalize' }}
                  className="form-control" onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                    setVillage(e.target.value);
                  }} placeholder="Village" required />                              {errors.village && <div className="text-danger">{errors.village}</div>}
              </div>
              <div><label htmlFor="text">18. Pincode</label>
                <input type="text" value={pincode}
                  className="form-control" onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, ''); // Allow only digits
                    setPincode(e.target.value);
                  }}
                  minLength={6} maxLength={6} placeholder="Pincode" pattern="^\d{6}$"
                  title="Enter a valid 6-digit Pincode."
                  required />                              {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
              </div>
              <div><label htmlFor="text">19. Mandal</label>
                <input type="text" value={mandal} style={{ textTransform: 'capitalize' }}
                  className="form-control" onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                    setMandal(e.target.value);
                  }} placeholder="Mandal" required />                              {errors.mandal && <div className="text-danger">{errors.mandal}</div>}
              </div>
              <div><label htmlFor="text">20. District</label>
                <input type="text" value={district} style={{ textTransform: 'capitalize' }}
                  className="form-control" onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                    setDistrict(e.target.value);
                  }} placeholder="District" required />                              {errors.district && <div className="text-danger">{errors.district}</div>}
              </div>
              <div><label htmlFor="text">21. State</label>
                <input type="text" value={state} style={{ textTransform: 'capitalize' }}
                  className="form-control" onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                    setState(e.target.value);
                  }} placeholder="State" required />                              {errors.state && <div className="text-danger">{errors.state}</div>}
              </div>
            </div>



            {verifyOtp ? (
              <center><button type="submit" className="register-button">
                Register
              </button></center>
            ) : sendOtp ? (
              <div className="modal-background">
                <div className="modal-popup">
                  <label htmlFor="otp">Enter OTP:</label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="verify-button"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSendOtp}
                className="send-otp-button"
              >
                Send OTP
              </button>
            )}
          </form>
        </div>
      </div>
    </div>


  )
}
