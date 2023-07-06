import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const host = "http://127.0.0.1:5000";

const AllJobs = () => {
  const navigate = useNavigate();
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    getJobPostings();
  }, []);

  const getJobPostings = async () => {
    try {
      const response = await fetch(`${host}/fetchjobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        //   "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      const sortedJobs = data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      
      // console.log(response.data)
      setJobPostings(sortedJobs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleJobDetails = (jobId) => {
    navigate(`/fetch/${jobId}`);
  };

  return (
    <div>
      <h2>All Jobs</h2>
      {jobPostings.map((job) => (
        <div key={job._id}>
          <h3>{job.companyname}</h3>
          <h3>{job.title}</h3>
          <h4>{job.jobtype}</h4>
          <p>{job.description}</p>
          <p>{job.salary}</p>
          <p>{job.location}</p>
          
          <button onClick={() => handleJobDetails(job._id)}>Details</button>
        </div>
      ))}
    </div>
  );
};

export default AllJobs;
