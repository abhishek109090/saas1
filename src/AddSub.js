import React, { useState } from 'react';
import axios from 'axios';

function AddSub() {
  const [loadingSublocations, setFrom] = useState('');
  const [unloadingSublocations, setTo] = useState('');
  const [distance, setDistance] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      loadingSublocations,
      unloadingSublocations,
      distance,
    };

    try {
      const response = await axios.post('http://3.109.145.125/addsublocations', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Data submitted');
        console.log('Data submitted successfully');
      } else {
        console.error('Data submission failed');
      }
    } catch (error) {
      console.error('An error occurred while submitting data:', error);
    }
    setDistance('');

  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4" style={{fontFamily:'Segoe UI',textShadow:'1px 2px 2px gray',marginLeft:'120px',}}>Data Submission Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>From:</label>
          <input
            type="text"
            className="form-control"
            value={loadingSublocations}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>To:</label>
          <input
            type="text"
            className="form-control"
            value={unloadingSublocations}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Distance:</label>
          <input
            type="text"
            className="form-control"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddSub;
