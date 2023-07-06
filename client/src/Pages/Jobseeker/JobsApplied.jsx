import React, { useState, useEffect } from 'react';
import axios from 'axios';

const host = "http://127.0.0.1:5000";

const JobAppliedPage = () => {
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(`${host}/api/jobseeker/jobs-applied`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const sortedApplications = response.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      console.log(response.data)
      setJobApplications(sortedApplications);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Jobs Applied</h2>
      {jobApplications.length === 0 ? (
        <p>No jobs applied yet.</p>
      ) : (
        <ul>
          {jobApplications.map((jobApplication) => (
            <li key={jobApplication._id}>
              <h3>{jobApplication.job.companyname}</h3>
              <h3>{jobApplication.job.title}</h3>
              <p>{jobApplication.job.jobtype}</p>
              <p>{jobApplication.job.description}</p>
              <p>{jobApplication.job.salary}</p>
              <p>{jobApplication.job.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobAppliedPage;
