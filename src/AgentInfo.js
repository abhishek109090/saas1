import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgentInfo.css'; // Your custom CSS file
import { Container, Table, Form, Button } from 'react-bootstrap'; // Import Bootstrap components
import { useLocation, useNavigate } from 'react-router-dom';
import OwnerNavbar from './OwnerNavbar';

export default function AgentInfo() {
  const location = useLocation();

  const [originalAgentData, setOriginalAgentData] = useState([]); // Store the original data
  const [agentData, setAgentData] = useState([]); // Store the filtered data
  const [loading, setLoading] = useState(false);
  const [selectedAgentData, setSelectedAgentData] = useState(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');
  const [allPhoneNumbers, setAllPhoneNumbers] = useState([]); // Store all fetched phone numbers
  const navigate = useNavigate();
  const crn = localStorage.getItem('userCRN');
  console.log('fdf', crn);

  useEffect(() => {
    fetchAllAgentData(crn);
    // Log the selected phone number when it changes
    console.log('Selected PhoneNumber:', selectedPhoneNumber);
  }, [selectedPhoneNumber]);

  const fetchAllAgentData = (crn) => {
    setLoading(true);
    axios
      .get(`https://mynode.trucksbooking.in/AgentInfo?crn=${crn}`)
      .then((response) => {
        console.log(response.data);
        setOriginalAgentData(response.data);
        const phoneNumbers = [
          ...new Set(response.data.map((agent) => agent.phonenumber)),
        ];
        setAllPhoneNumbers(phoneNumbers);
        setAgentData(response.data); // Set agentData to all data initially
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching agent data by CRN:', error);
        setLoading(false);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Use the selected phone number to filter the data
    const filteredData = filterAgentDataByPhoneNumber(selectedPhoneNumber);
    console.log(selectedPhoneNumber)
    setAgentData(filteredData);
    console.log('Updated Agent Data:', filteredData);
  };

  const filterAgentDataByPhoneNumber = (phoneNumber) => {
    console.log('Filtering by phone number:', phoneNumber);
  
    if (phoneNumber === '') {
      console.log('No phone number selected, returning original data.');
      return originalAgentData; // Return the original data when no phone number is selected
    } else {
      console.log('Filtering data for phone number:', phoneNumber);
      const filteredData = originalAgentData.filter((agent) => agent.phonenumber == (phoneNumber)); // Use includes for partial match
      console.log('Filtered Data:', filteredData);
      return filteredData;
    }
  };
  const Update = () => {
    // Check if selectedAgentData is not null
    if (selectedAgentData) {
      console.log(selectedAgentData);
      navigate('/AgentUpdate', {
        state: { agentData: selectedAgentData, crn },
      });
    }
  };

  return (
    <div>
      <OwnerNavbar />
      <div className="Agentbg p-5">
        <div className="Agent" id="Agent">
          <h2 className="txt" style={{ fontFamily: 'Segoe UI', textShadow: '1px 2px 2px gray', color: 'black', textAlign: 'center' }}>
            Agent Info
          </h2>
          <Form onSubmit={handleFormSubmit}>
            <div style={{ display: 'flex' }}>
              <Form.Group controlId="phoneNumber">
                <Form.Control
                  as="select"
                  value={selectedPhoneNumber}
                  className="agent-id-feild"
                  onChange={(e) => setSelectedPhoneNumber(e.target.value)}
                >
                  <option value="">Select Agent Id</option>
                  {allPhoneNumbers.map((phoneNumber) => (
                    <option key={phoneNumber} value={phoneNumber}>
                      {phoneNumber}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" className="btn btn-info ms-2" id="infobutton" type="submit">
                Get Info
              </Button>
              <br></br>
              <br></br>
            </div>
          </Form>
          <br />
          <div id="Scroll-bar">
            <Table striped bordered hover style={{ textTransform: 'capitalize' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center', fontWeight: 'normal' }} id="thead">
                    Agent Type
                  </th>
                  <th style={{ textAlign: 'center', fontWeight: 'normal' }} id="thead">
                    Agent Name
                  </th>
                  <th style={{ textAlign: 'center', fontWeight: 'normal' }} id="thead">
                    Phone Number
                  </th>
                  <th style={{ textAlign: 'center', fontWeight: 'normal' }} id="thead">
                    Mandal
                  </th>
                  <th style={{ textAlign: 'center', fontWeight: 'normal' }} id="thead">
                    District
                  </th>
                  <th style={{ textAlign: 'center', fontWeight: 'normal' }} id="thead">
                    State
                  </th>
                  <th style={{ textAlign: 'center', fontWeight: 'normal' }} id="thead">
                    Edit
                  </th>
                  <th style={{ textAlign: 'center', fontWeight: 'normal' }} id="thead">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8">Loading agent details...</td>
                  </tr>
                ) : agentData.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="ms-5 text-danger" style={{ fontWeight: 'bold' }}>
                      No agent details available.
                    </td>
                  </tr>
                ) : (
                  agentData.map((agent) => (
                    <tr key={agent.id} onClick={() => setSelectedAgentData(agent)}>
                      <td style={{ textAlign: 'center' }}>{agent.agentType}</td>
                      <td style={{ textAlign: 'center' }}>{agent.name}</td>
                      <td style={{ textAlign: 'center' }}>{agent.phonenumber}</td>
                      <td style={{ textAlign: 'center' }}>{agent.village}</td>
                      <td style={{ textAlign: 'center' }}>{agent.district}</td>
                      <td style={{ textAlign: 'center' }}>{agent.state}</td>
                      <td style={{ textAlign: 'center' }}>
                        <Button variant="info" size="sm" onClick={Update}>
                          <span role="img" aria-label="Edit">
                            ✏️Edit
                          </span>
                        </Button>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <Button variant="danger" size="sm">
                          <span role="img" aria-label="Delete">
                            ❌Delete
                          </span>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
