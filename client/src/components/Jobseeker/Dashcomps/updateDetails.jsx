import React, { useState, useContext } from 'react';
import JobSeekerContext from '../../../context/Jobseeker/JobseekerContext';

const UpdateProfileModal = ({ closeModal, jobId }) => {
  const { updateJobSeekerDetails } = useContext(JobSeekerContext);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('');
  const [duration, setDuration] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJobSeekerDetails(jobId, name, address, experience, duration, education, skills, file);
    closeModal();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Experience</label>
            <input type="text" id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="education">Education</label>
            <input type="text" id="education" value={education} onChange={(e) => setEducation(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="skills">Skills</label>
            <input type="text" id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload File</label>
            <input type="file" id="file" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
