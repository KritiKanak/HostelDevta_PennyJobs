import React, { useContext, useEffect, useState } from 'react';
import JobSeekerContext from '../../../context/Jobseeker/JobseekerContext';
import { Link } from 'react-router-dom';
import UpdateProfileModal from './updateDetails';

const JobSeekerProfile = () => {
  const { jobSeekerDetails, getJobSeekerDetails } = useContext(JobSeekerContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');

  useEffect(() => {
    getJobSeekerDetails();
  }, []);

  const toggleModal = (jobId) => {
    setSelectedJobId(jobId);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container">
      <h2>Job Seeker Profile</h2>
      {jobSeekerDetails.map((detail) => (
        <div key={detail._id}>
          <h3>{detail.name}</h3>
          <p>Address: {detail.address}</p>
          <p>Experience: {detail.experience}</p>
          <p>Duration: {detail.duration}</p>
          <p>Education: {detail.education}</p>
          <p>Skills: {detail.skills}</p>
          {detail.fileDownloadURL && (
            <div>
              <h4>Document Preview:</h4>
              <iframe
                src={detail.fileDownloadURL}
                width="50%"
                height="500px"
                title="Document Preview"
              ></iframe>
            </div>
          )}
          <button className="btn btn-primary" onClick={() => toggleModal(detail._id)}>
            Update Profile
          </button>
        </div>
      ))}
      {isModalOpen && (
        <UpdateProfileModal jobId={selectedJobId} closeModal={toggleModal} />
      )}
    </div>
  );
};

export default JobSeekerProfile;
