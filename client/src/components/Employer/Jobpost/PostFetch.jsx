import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const host = "http://127.0.0.1:5000";

const JobsPostedByEmployer = () => {
  const [jobsPosted, setJobsPosted] = useState([]);

  useEffect(() => {
    fetchJobsPosted();
  }, []);

  const fetchJobsPosted = async () => {
    try {
      const response = await axios.get(`${host}/api/employer/fetch`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      setJobsPosted(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h2>Jobs Posted</h2>
      {jobsPosted.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <ul>
          {jobsPosted.map((job) => (
            <li key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.jobtype}</p>
              <p>{job.description}</p>
              <p>{job.location}</p>
              <p>{job.salary}</p>
              <Link to={`/applications/${job._id}`}>View Applications</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobsPostedByEmployer;
