import React, { useState, useContext } from 'react';
import EmployerContext from '../../../context/Employer/employerContext';

const EmployerUpdateProfileModal = ({ closeModal, employerId }) => {
  const { updateEmDetails } = useContext(EmployerContext);

  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [size, setSize] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmDetails(employerId, companyName, address, size, type);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Update Employer Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="size">Size</label>
            <input type="text" id="size" value={size} onChange={(e) => setSize(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EmployerUpdateProfileModal;
