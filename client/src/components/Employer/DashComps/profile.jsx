import React, { useContext, useEffect, useState } from 'react';
import EmployerContext from '../../../context/Employer/employerContext';
import UpdateProfileModal from './updatedetails';

const EmployerProfile = () => {
  const { employerDetails, getEmDetails } = useContext(EmployerContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployerId, setSelectedEmployerId] = useState('');

  useEffect(() => {
    getEmDetails();
  }, []);

  const toggleModal = (employerId) => {
    setSelectedEmployerId(employerId);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container">
      <h2>Employer Profile</h2>
      {employerDetails.map((detail) => (
        <div key={detail._id}>
          <h3>{detail.companyname}</h3>
          <p>Address: {detail.address}</p>
          <p>Size: {detail.size}</p>
          <p>Type: {detail.type}</p>
          <button onClick={() => toggleModal(detail._id)}>Update Profile</button>
        </div>
      ))}
      {isModalOpen && (
        <UpdateProfileModal employerId={selectedEmployerId} closeModal={toggleModal} />
      )}
    </div>
  );
};

export default EmployerProfile;
