import React, { useState, useEffect } from 'react';

const host = "http://127.0.0.1:5000";

const AllJobs = () => {
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
      setJobPostings(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>All Jobs</h2>
      {jobPostings.map((job) => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <h4>{job.jobtype}</h4>
          <p>{job.description}</p>
          <p>{job.salary}</p>
          <p>{job.location}</p>
          {/* Display other job details */}
        </div>
      ))}
    </div>
  );
};

export default AllJobs;
