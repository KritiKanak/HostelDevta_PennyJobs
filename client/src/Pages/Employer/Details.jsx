import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employerContext from '../../context/Employer/employerContext';

const EmployerDetails = () => {
  const { addEmDetails } = useContext(employerContext);
  const navigate = useNavigate();

  const [companyname, setCompanyname] = useState('');
  const [address, setAddress] = useState('');
  const [size, setSize] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addEmDetails(companyname, address, size, type);
    setCompanyname('');
    setAddress('');
    setSize('');
    setType('');
    navigate('/addjob')
  };

  return (
    <div className="container">
      <h2>Add Employer Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="companyname">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="companyname"
            value={companyname}
            onChange={(e) => setCompanyname(e.target.value)}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            rows="4"
            cols="50"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            minLength={5}
            maxLength={150}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="size" className="form-label">Size</label>
          <input
            type="text"
            className="form-control"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <input
            type="text"
            className="form-control"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Add Employer Details</button>
      </form>
    </div>
  );
};

export default EmployerDetails;
