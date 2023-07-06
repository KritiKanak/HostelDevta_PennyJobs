import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import JobPostingContext from '../../../context/Jobposting/JobpostContext';

const AddJob = () => {
  const navigate = useNavigate();
  const jobPostingContext = useContext(JobPostingContext);

  const [jobDetails, setJobDetails] = useState({
    title: '',
    jobType: '',
    description: '',
    location: '',
    salary: '',
  });

  const { title, jobType, description, location, salary } = jobDetails;

  const handleChange = (e) => {
    setJobDetails({
      ...jobDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add job posting
      await jobPostingContext.addJobPosting(title, jobType, description, location, salary);

      // Clear the form by resetting the jobDetails state
      setJobDetails({
        title: '',
        jobType: '',
        description: '',
        location: '',
        salary: '',
      });

      // Redirect to employer details page
      // navigate('/employer/details');
    } catch (error) {
      console.error('Failed to add job posting:', error);
    }
  };

  return (
    <div>
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="jobType">Job Type</label>
          <input
            type="text"
            id="jobType"
            name="jobType"
            value={jobType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={salary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJob;
