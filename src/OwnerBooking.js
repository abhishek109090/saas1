import React, { useState, useEffect } from "react";
import "./OwnerBooking.css"; // Import your CSS file here
import axios from "axios"; // Import your CSS file here
import jsPDF from "jspdf";
import { useLocation,useNavigate } from 'react-router-dom';
import OwnerNavbar from "./OwnerNavbar";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';


function OwnerBooking() {
  const location = useLocation();
const navigate=useNavigate();
  const [activeContent, setActiveContent] = useState("MyTruckPostings");
  const [data, setData] = useState([]);
  const [from, setFrom] = useState(""); // State to store the "From Date"
  const [to, setTo] = useState("");
  const [selectedRegistrationNumber, setSelectedRegistrationNumber] = useState("");
  const [truckData, setTruckData] = useState([]);
  const [registrationNumbers, setRegistrationNumbers] = useState([]);
  // const [crn, setCRN] = useState('');
  const [tbr, setTBR] = useState('');
  const [bookings, setBookings] = useState([]);
  const displayContent = (contentId) => {
    setActiveContent(contentId);
  };
  const crn = sessionStorage.getItem('userCRN');
  console.log(crn)

  useEffect(() => {
    // Fetch registration numbers from your backend API and set them in registrationNumbers state
    async function fetchRegistrationNumbers() {
      try {
        const response = await axios.get("http://3.109.145.125:9001/truckNumber2", {
          params: {
            crn: crn, // Pass the CRN as a query parameter
          },
        });
        const registrationNumbersData = response.data;
        setRegistrationNumbers(registrationNumbersData);
      } catch (error) {
        console.error("Error fetching registration numbers:", error);
      }
    }

    fetchRegistrationNumbers();
  }, [crn]); 
  const handleRepost= () => {
    navigate('/TruckPosting', { state: { crn } })
  };
  const fetchDataByDateRange = async () => {
    try {
      console.log(`Fetching data for date range: from ${from} to ${to}`);
      const response = await axios.get('http://3.109.145.125:9001/PostDate', {

        params: {
          from,
          to,
          crn,
        },
      });

      const fetchedData = response.data;
      console.log('Fetched Data:', fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors
    }
  };
    const [truckPostings, setTruckPostings] = useState([]);
    useEffect(() => {
      // Fetch only the last 7 days posted trucks from the backend when the component mounts
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
      axios.get("http://3.109.145.125:9001/Post", {
          params: {
            date: sevenDaysAgo.toISOString().split("T")[0], // Convert to YYYY-MM-DD format
          },
        })
        .then((response) => {
          setTruckPostings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching last 7 days truck postings:", error);
        });
    }, []);
    // useEffect(() => {
    //   if (location.state && location.state.crn) {
    //     setCRN(location.state.crn);
    //     console.log('CRN:', location.state.crn);
    //   }
    // }, [location.state]);  
    useEffect(() => {
      if (crn) {
        fetchTruckPostingsByCRN(crn);
      }
    }, [crn]);
    const fetchTruckPostingsByCRN = async (crn) => {
      try {
        const response = await axios.get('http://3.109.145.125:9001/Post', {
          params: {
            crn,
          },
        });
  
        const fetchedTruckPostings = response.data;
        console.log('Fetched Truck Postings:', fetchedTruckPostings);
        setTruckPostings(fetchedTruckPostings);
      } catch (error) {
        console.error('Error fetching truck postings:', error);
      }
    };
    useEffect(() => {
      // Fetch bookings data from the backend when the component mounts
      axios.get(`http://3.109.145.125:9001/booking/${crn}`)
        .then((response) => {
          setBookings(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error);
        });
    },[crn]);
  
    const handleCancelPosting = (id, date, time) => {
      // Check if an agent is booked for this truck posting
      const booking = bookings.find( (booking) =>
          booking.truckNumber === selectedRegistrationNumber &&
          booking.date === date &&
          booking.time === time
      );
    
      if (booking) {
        console.log(
          `Booking found for truck ${selectedRegistrationNumber}, booking agent: ${booking.name}`
        );
        // Set the booking status as "Booking Completed"
        const updatedTruckPostings = truckPostings.map((posting) => {
          if (posting.id === id) {
            posting.status = "Booking Completed";
          }
          return posting;
        });
        setTruckPostings(updatedTruckPostings);
      } else {
        // Delete the truck posting if no booking found
        axios.delete(`http://3.109.145.125:9001/post/${id}`)
          .then(() => {
            // Remove the deleted posting from the local state
            setTruckPostings(truckPostings.filter((posting) => posting.id !== id));
          })
          .catch((error) => {
            console.error("Error deleting truck posting:", error);
          });
    
        axios
          .delete(`http://3.109.145.125:9001/post1/${id}`)
          .then(() => {
            console.log("Truck posting deleted from post1 table.");
          })
          .catch((error) => {
            console.error("Error deleting truck posting from post1:", error);
          });
      }
    };
    
    const fetchDataByTBR = async () => {
      try {
        console.log(`Fetching data for TBR number: ${tbr}`);
        const response = await axios.get('http://3.109.145.125:9001/tbr', {
          params: {
            tbr,
            crn,
          },
        });
  
        const fetchedData = response.data;
        console.log('Fetched Data:', fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  const fetchTruckByRegistration = async () => {
    try {
      console.log(`Fetching truck data for registration number: ${selectedRegistrationNumber}`);
      const response = await axios.get('http://3.109.145.125:9001/PostTruck', {
        params: {
          truckNumber: selectedRegistrationNumber,
          crn: crn,

        },
      });

      const fetchedData = response.data;
      console.log('Fetched Truck Data:', fetchedData);
      setTruckData(fetchedData);
    } catch (error) {
      console.error('Error fetching truck data:', error);
    }
  };
  const isPrintButtonDisabled = (booking) => {
    return !booking || booking.status !== "active";
  };

  const generatePDF = (booking) => {
    if (isPrintButtonDisabled(booking)) {
      console.log("Print button is disabled.");
      return;
    }
    const doc = new jsPDF({
      orientation: 'p', // 'p' for portrait, 'l' for landscape
      unit: 'mm',
      format: 'a4', // or your desired page format
    });
    const topMargin = 9; // Adjust the margin as needed
  
    // Calculate the center of the page horizontally
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;
  
    // Calculate the top position for the heading
    let topPosition = topMargin;
  
    // Add content to the PDF
    doc.setFontSize(16); // Adjust the font size as needed
    doc.text('GRCTOB', centerX, topPosition, { align: 'center' });
    
    // Increase the topPosition for the next element
    topPosition += 10;
  
    doc.setFontSize(12);
    doc.text(`Agent Name: ${booking.name}`, 15, topPosition);
    topPosition += 10;
    doc.text(`Agent ID: ${booking.agentId}`, 15, topPosition);
    topPosition += 10;
    doc.text(`Agent Phone Number: ${booking.phonenumber}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`From Location: ${booking.from}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`Loading Sublocation: ${booking.fromSublocation}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`Loading Address: ${booking.fromAddress}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`Loading Pincode: ${booking.fromPincode}`, 15, topPosition);
    topPosition += 15; // Increase spacing for the table
  
    // Add a table for sno, truck number, kilometers, max weight, and price
    const tableData = [];
    tableData.push(["S.No", "Truck Number", "Date ","TBR", "Material", "Price"]);
    // Add your data to the table here (replace the example data)
    tableData.push(["1", booking.truckNumber, booking.date, booking.tbr,booking.type, booking.totalPrice]);
  
    doc.autoTable({
      startY: topPosition,
      head: tableData.slice(0, 1),
      body: tableData.slice(1),
      margin: { top: 70 },
    });
  
    // Increase the topPosition for the next element after the table
    topPosition = doc.autoTable.previous.finalY + 15;
  
    doc.text(`To Location: ${booking.to}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`Unloading Sublocation: ${booking.toSublocation}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`Unloading Address: ${booking.toAddress}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`Unloading Pincode: ${booking.toPincode}`, 15, topPosition);
    topPosition += 10;
    doc.text(`Distance: ${booking.totalKilometers} KMs`, 15, topPosition);
    topPosition += 10; 
    doc.text(`Truck-Max Weight: ${booking.truckMaxWeight} Tons`, 15, topPosition);
    topPosition += 10;
  
    // Save the PDF or open in a new tab
    doc.save(`Booking_${booking.id}.pdf`);
  };    // Save the PDF or open in a new tab
  const generatePDF1 = (booking) => {
    if (isPrintButtonDisabled(booking)) {
      console.log("Print button is disabled.");
      return;
    }
    const doc = new jsPDF({
      orientation: 'p', // 'p' for portrait, 'l' for landscape
      unit: 'mm',
      format: 'a4', // or your desired page format
    });
    const topMargin = 9; // Adjust the margin as needed
  
    // Calculate the center of the page horizontally
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;
  
    // Calculate the top position for the heading
    let topPosition = topMargin;
    doc.setFont("fontName", "fontStyle"); // Replace "fontName" and "fontStyle" with your desired values

    // Add content to the PDF
    doc.setFontSize(16); // Adjust the font size as needed
    doc.setTextColor(0, 51, 102); // Set text color (R, G, B)
    // doc.setFontStyle('bold'); // Set font style to bold
    doc.text('GRCTOB', centerX, topPosition, { align: 'center' });
    doc.setFont("Arial", "normal");
    doc.text('GRCTOB', centerX, topPosition, { align: 'center' });
    
    // Increase the topPosition for the next element
    topPosition += 10;
  
    doc.setFontSize(12);
    doc.text(`TBR Number: ${booking.tbr}`, 15, topPosition);
    topPosition += 10;
    doc.text(`Truck Number: ${booking.truckNumber}`, 15, topPosition);
    topPosition += 10;
    doc.text(`Date Of Booking: ${booking.date}`, 15, topPosition);
    topPosition += 10;

    doc.text(`Agent Name: ${booking.name}`, 15, topPosition);
    topPosition += 10;
    doc.text(`Agent ID: ${booking.agentId}`, 15, topPosition);
    topPosition += 10;
    doc.text(`Agent Phone Number: ${booking.phonenumber}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`From Location: ${booking.from}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`Loading Sublocation: ${booking.fromSublocation}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`Loading Address: ${booking.fromAddress}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`Loading Pincode: ${booking.fromPincode}`, 15, topPosition);
    topPosition += 15; // Increase spacing for the table
  
    // Add a table for sno, truck number, kilometers, max weight, and price
    
  
    doc.text(`To Location: ${booking.to}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`Unloading Sublocation: ${booking.toSublocation}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`Unloading Address: ${booking.toAddress}`, 15, topPosition);
    topPosition += 10;
  
    doc.text(`Unloading Pincode: ${booking.toPincode}`, 15, topPosition);
    topPosition += 10;
    doc.text(`Distance: ${booking.totalKilometers} KMs`, 15, topPosition);
    topPosition += 10; 
    doc.text(`Truck-Max Weight: ${booking.truckMaxWeight} Tons`, 15, topPosition);
    topPosition += 10;
    doc.text(`Booking Price: ${booking.totalPrice}/-`, 15, topPosition);
    topPosition += 10;
  
    // Save the PDF or open in a new tab
    doc.save(`Booking_${booking.id}.pdf`);
  }; 
  
  return (
    <div className="fo">
      <OwnerNavbar/>
      <div className="container-fluid shadow mt-2" >
        <div className="row side" style={{height:"100vh",borderRadius:'130px'}}>
          <div className="col-md-3 options-owner">
      <h3 className="txt" style={{fontFamily: 'Segoe UI', textShadow: '1px 2px 2px gray',textAlign:'center' }}>Manage Bookings</h3>

      {/* Button for Mobile Toggle */}
    
      <button 
        className=" d-md-none" // Hide on medium and larger screens
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#optionsCollapse"
        aria-expanded="false"
        aria-controls="optionsCollapse"
        style={{backgroundColor:'transparent'}}
      >
       <div class="dropdown">
  <button class="btn btn-info p-2 dropdown-toggle"   type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <MenuOutlinedIcon fontSize='large' />
  </button>
  <ul class="dropdown-menu ps-3 pr-2">
    <li>   <button 
              className={`btn btn-info  option-button ${activeContent === "MyTruckPostings" ? "active" : ""
                }`}
              onClick={() => displayContent("MyTruckPostings")} 
            >
              <span className="button-number-1 "> A </span>
               <span className="ownzoom">My Truck Postings </span>
        </button></li>
    <li>    <button 
              className={`btn btn-info option-button ${activeContent === "searchByVehicleForm" ? "active" : ""
                }`}
              onClick={() => displayContent("searchByVehicleForm")}
            >
              <span className="button-number-1">B</span>
               <span className="ownzoom">Search by Registration No </span>
            </button>
</li>
    <li>  
      <button 
              className={`btn btn-info option-button ${activeContent === "searchByDateForm" ? "active" : ""
                }`}
              onClick={() => displayContent("searchByDateForm")} 
            >
              <span className="button-number-1">C</span> 
                <span className="ownzoom">Search by Date</span>
         </button>
      </li>
    <li>
    <button 
              className={`btn btn-info option-button ${activeContent === "invoiceTrackingForm" ? "active" : ""
                }`}
              onClick={() => displayContent("invoiceTrackingForm")} 
            >
              <span className="button-number-1">D</span> 
              <span className="ownzoom">TBR Number </span>
            </button>
    </li>
    <li>
    <button  
              className={`btn btn-info option-button ${activeContent === "trucktrackingform" ? "active" : ""
                }`}
              onClick={() => displayContent("trucktrackingform")}  
            >
              <span className="button-number-1">E</span>
                <span className="ownzoom">Invoice Number</span>
            </button>
    </li>
  </ul>
</div>
      </button>
    

      {/* Collapsible Buttons */}
      <div className="collapse d-md-block" id="optionsCollapse">
         {/* Hidden on small screens */}
         <div  > 
        <div> 
        <button id="Onwer-items"
              className={`btn btn-info  option-button ${activeContent === "MyTruckPostings" ? "active" : ""
                }`}
              onClick={() => displayContent("MyTruckPostings")} 
            >
              <span className="button-number-1 "> A </span> <span className="ownzoom">My Truck Postings </span>
        </button>
        </div>
        
        <div>
        <button id="Onwer-items"
              className={`btn btn-info option-button ${activeContent === "searchByVehicleForm" ? "active" : ""
                }`}
              onClick={() => displayContent("searchByVehicleForm")}
            >
              <span className="button-number-1">B</span> <span className="ownzoom">Search by Registration No </span>
            </button>

            </div>
        
            <div >
        <button id="Onwer-items"
              className={`btn btn-info option-button ${activeContent === "searchByDateForm" ? "active" : ""
                }`}
              onClick={() => displayContent("searchByDateForm")} 
            >
              <span className="button-number-1">C</span>   <span className="ownzoom">Search by Date</span>
            </button>
            </div>
      
            <div >
        <button id="Onwer-items"
              className={`btn btn-info option-button ${activeContent === "invoiceTrackingForm" ? "active" : ""
                }`}
              onClick={() => displayContent("invoiceTrackingForm")} 
            >
              <span className="button-number-1">D</span> <span className="ownzoom">TBR Number </span>
            </button>
            </div>
        
            <div>
        <button  id="Onwer-items"
              className={`btn btn-info option-button ${activeContent === "trucktrackingform" ? "active" : ""
                }`}
              onClick={() => displayContent("trucktrackingform")}  
            >
              <span className="button-number-1">E</span>  <span className="ownzoom">Invoice Number</span>
            </button>
            </div>
        
        {/* Add similar buttons for other options */}
      </div>
      </div>
    

          
          </div>

          <div className="col-md-9 content" id="content" style={{backgroundColor:'#e2eff1'}}>
          {activeContent === "MyTruckPostings" && (
              <div>
                <h2 style={{textShadow:'2px 2px 2px grey',textAlign:"center"}} id="s-b-r-n-h2"> A. Posted Trucks</h2><br></br>
               
                <table className="table" style={{textAlign:'center',textTransform:'capitalize'}}>
        <thead  >
          <tr>
            <th  id='thead'>Truck Number</th>
            <th  id='thead'>Date of Posting</th>
            <th  id='thead'>Time</th>
            <th   id='thead'>From </th>
            <th  id='thead'>From Sublocations</th>
            <th   id='thead'>To </th>
            <th   id='thead'>To Sublocations </th>
            <th   id='thead'>Status </th>
            <th   id='thead'>Agent Booked</th>
            <th   id='thead'>Print</th>
          </tr>
        </thead>
        <tbody>
          {truckPostings.map((posting) => {
 const booking = bookings.find(
  (booking) =>
    booking.truckNumber === posting.truckNumber &&
    booking.date === posting.date &&
    booking.time === posting.time
);             console.log(booking)
             return (
          
            <tr key={posting.id}>
              <td>{posting.truckNumber}</td>
              <td>{posting.date.split('-').reverse().join('-')}</td>
              <td>{posting.time}</td>
              <td>{posting.from}</td>

              <td>{posting.loadingSublocations}</td>
              <td>{posting.to}</td>
              <td>{posting.unloadingSublocations}</td>

             
              <td >
              {booking ? (
               booking.status === "active" ? (
                <span style={{ color: 'green', fontSize: '15px', fontWeight: 'bold' }}>
                  Booking Completed
                </span>
              ) : booking.status === "canceled" ? (
                <div>
                <span style={{ color: 'red', fontSize: '15px', fontWeight: 'bold' }}>
                  Booking Cancelled
                </span>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ maxWidth:'200px' }}
                  onClick={() => handleCancelPosting(posting.id)}
                >
                  Cancel Posting
                </button>
              </div>
                
              ) : (
                <span style={{ color: 'orange', fontSize: '15px', fontWeight: 'bold' }}>
                  Booking In Progress
                </span>
              )
            ) : new Date(posting.date) <= new Date() ? (
              <div>
              <span style={{color:'red',fontWeight:'bold'}}>Truck Expired</span>
              <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleRepost(posting)}
      >
        Repost
      </button>
      </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ maxWidth: "500px" }}
                  onClick={() => handleCancelPosting(posting.id)}
                >
                  Cancel Posting
                </button>
               )}
            </td>
                    
                        
              <td style={{color:"blue",fontSize:'15px', fontWeight: 'bold'}}> {booking ? booking.name : "No agent booked"}</td>
               <td> <button
                        type="button"
                        className="btn btn-primary"
                        style={{ maxWidth: "500px" }}
                        disabled={isPrintButtonDisabled(booking)}
                        onClick={() => generatePDF(booking)} // Add this line
                      >
                        Print Booking
                      </button></td>
            </tr>
          );
              })}
        </tbody>
      </table>
              </div>
            )}
            {activeContent === "searchByVehicleForm" && (
  <div>
   <h2 style={{fontFamily:'Segoe UI',textShadow:'1px 2px 2px gray'}} id="s-b-r-n-h2">B. Search by Registration No</h2>
    <form  id="manage-booking-form">
    <label htmlFor="vehicleNo" className="mt-5" style={{ marginRight: '1rem' }} >
    Truck Registration Number
  </label>
    <div className="form-group "  id="manage-forms">
  <select
    className="form-control mt-2" 
    id="Search-by-registration"
    value={selectedRegistrationNumber}
    onChange={(e) => setSelectedRegistrationNumber(e.target.value)}
  >
    <option value="">- Select -</option>
    {registrationNumbers.map((truckNumber) => (
      <option key={truckNumber} value={truckNumber}>
        {truckNumber}
      </option>
    ))}
  </select>
  <button
    type="button"
    onClick={fetchTruckByRegistration}
    className="btn btn-info ms-2" style={{padding:'6px'}}
  >
    Get Info
  </button>
</div>
      <br></br><br></br>
    </form>
    {truckData.length === 0 ? (
       <p style={{color:'red',fontWeight:'bold'}}>No bookings done for this truck number.</p>
    ) : (
      <table className="table" style={{textAlign:'center',textTransform:'capitalize'}} >
        <tr>
          <th  id='thead'>Truck Numbers</th>
          <th  id='thead'>Agent Name</th>
          <th  id='thead'>Booked Date</th>
          <th  id='thead'>From Location</th>
          <th  id='thead'>To Location</th>
          <th  id='thead'>Booking Status</th>
          <th  id='thead'>Payment Status</th>
        </tr>
        <tbody>
          {truckData.map((truck) => (
            <tr key={truck.id}>
              <td>{truck.truckNumber}</td>
              <td>{truck.name}</td>
              <td>{truck.date.split('-').reverse().join('-')}</td>
              <td>{truck.from}</td>
              <td>{truck.to}</td>
              <td>
                {truck.status === "active" ? (
                  <span style={{ color: 'green', fontSize: '15px', fontWeight: 'bold' }}>
                    Booking Completed
                  </span>
                ) : truck.status === "canceled" ? (
                  <span style={{ color: 'red', fontSize: '15px', fontWeight: 'bold' }}>
                    Booking Cancelled
                  </span>
                ) : (
                  <span style={{ color: 'orange', fontSize: '15px', fontWeight: 'bold' }}>
                    Booking In Progress
                  </span>
                )}
              </td>
              <td>
                {truck.paymentStatus === "PaymentPending" && truck.status === "active" ? (
                  <span style={{ color: 'orange', fontSize: '15px', fontWeight: 'bold' }}>
                    Pending Payment
                  </span>
                ) : truck.paymentStatus === "payment completed" ? (
                  <span style={{ color: 'green', fontSize: '15px', fontWeight: 'bold' }}>
                    Payment Completed
                  </span>
                ) : (
                  <span style={{ color: 'red', fontSize: '15px', fontWeight: 'bold' }}>
                    Booking Cancelled
                  </span>
                )}
              </td>
              {/* Other columns here */}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)}

            {activeContent === "searchByDateForm" && (
              <div>
                
                <h2 style={{fontFamily:'Segoe UI',textShadow:'1px 2px 2px gray'}} id="s-b-r-n-h2">C. Search by Date</h2>
                <div  id="manage-forms1" className="mt-5">
                  <div className="form-group">
                    <label htmlFor="fromDate" style={{fontWeight:'bold'}} className="ms-2">From Date</label>
                    <input
                      type="date"
                      id="fromDate" 
                      name="fromDate"
                      className="form-control"
                      style={{ maxWidth: '200px', marginLeft: '10px',textTransform:'uppercase' }}

                      value={from}
                      onChange={(e) => setFrom(e.target.value)} required
                    />
                  </div>
                  <div className="form-group" id="input">
                    <label htmlFor="toDate" style={{fontWeight:'bold'}}>To Date</label>
                    <input
                      type="date"
                      id="toDate"
                      name="toDate"
                      style={{ maxWidth: '200px',textTransform:'uppercase' }}
                      className="form-control ms-3"
                      value={to}
                      onChange={(e) => setTo(e.target.value)} required/>
                  </div>
                  
                  <div id="get-info">
                  <button 
                    onClick={fetchDataByDateRange}
                    className="btn btn-info"
                  >
                    Get Info
                  </button>
                  </div>
                  </div>
              
                <br></br>
                <table className="table" style={{textAlign:'center'}}>
                  <thead>
                    <tr>
                      <th  id='thead'>Truck Number</th>
                      <th  id='thead'>Date</th>
                      <th  id='thead'>Time</th>
                      <th  id='thead'>From</th>
                      <th  id='thead'>To</th>

                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.truckNumber}</td>
                        <td>{item.date.split('-').reverse().join('-')}</td>
                        <td>{item.time}</td>
                        <td>{item.from}</td>
                        <td>{item.to}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
             {activeContent === "invoiceTrackingForm" && (
               
              <div>
                 
                <h2 style={{fontFamily:'Segoe UI',textShadow:'1px 2px 2px gray'}} id="s-b-r-n-h2">D. TBR Number</h2>
              
                
                <form className="mt-5">
                  
                  <div className="form-grou d-flex" >
                    {/* <label htmlFor="tbrNumber">TBR Number:</label> */}
                    <div> 
                    <input
                      type="text"
                      id="tbrNmber"
                      name="tbrNumber"
                      placeholder="Enter TBR Number"
                      className="form-control "
                      style={{maxWidth:'200px'}}
                      value={tbr}
                      onChange={(e) => setTBR(e.target.value)}
                      required
                    />
                  </div>
                 <div>
                  <button
                    type="button"
                    onClick={fetchDataByTBR}
                    className="btn btn-info ms-3"
                  >
                    Get Info
                  </button>
                  </div>
                  </div>
                </form>
                
                
                <br></br>
                <table className="table" style={{textAlign:'center'}}>
                  <thead >
                    <tr>
                    <th  id='thead'>TBR Number</th>
                      <th  id='thead'>Truck Number</th>
                      <th  id='thead'>Date</th>
                      <th  id='thead'>Time</th>
                      <th  id='thead'>From</th>
                      <th  id='thead'>To</th>
                      <th  id='thead'>Print</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((booking) => (
                      <tr key={booking.id}>
                                    <td>{booking.tbr}</td>

                        <td>{booking.truckNumber}</td>
                        <td>{booking.date.split('-').reverse().join('-')}</td>
                        <td>{booking.time}</td>
                        <td>{booking.from}</td>
                        <td>{booking.to}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ maxWidth: "500px" }}
                            onClick={() => generatePDF1(booking)} // Add this line
                          >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
  <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
  <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
</svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeContent === "trucktrackingform" && (
               
              <div>
                <h2 style={{fontFamily:'Segoe UI',textShadow:'1px 2px 2px gray'}} id="s-b-r-n-h2">E. Invoice Number</h2>
                <form>
                  <div className="form-group "  >
                    {/* <label htmlFor="trackingId">Registration Number:</label> */}
                    <div  style={{width:'240px'}}> 
                    <input
                      type="text"
                      id="trackgId"
                      name="trackingId"
                      placeholder="Enter Registration Number"
                      className="form-control mt-5"
                      required
                    />
                  </div>
                  <div>
                  <button
                    type="submit"
                    className="btn btn-info mt-5 ms-4"
                  >
                  Get Info
                  </button>
                  </div>
                  </div>
                </form>
              </div>
          
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerBooking;
