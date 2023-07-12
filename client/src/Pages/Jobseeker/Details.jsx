import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import JobSeekerContext from '../../context/Jobseeker/JobseekerContext';

const JobSeekerDetails = () => {
  const { addJobSeekerDetails } = useContext(JobSeekerContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('');
  const [duration, setDuration] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addJobSeekerDetails(name, address, experience, duration, education, skills, file);
    setName('');
    setAddress('');
    setExperience('');
    setDuration('');
    setEducation('');
    setSkills('');
    setFile(null);
    navigate('/jobseeker/dashboard');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <>

      <div className="container">
        <h2>Add Job Seeker Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label htmlFor="education" className="form-label">Education</label>
            <input
              type="text"
              className="form-control"
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="experience" className="form-label">Experience</label>
            <input
              type="text"
              className="form-control"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="skills" className="form-label">Skills</label>
            <input
              type="text"
              className="form-control"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">Upload AadharCard</label>
            <input
              type="file"
              className="form-control"
              id="file"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success">Add Job Seeker Details</button>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default JobSeekerDetails;
