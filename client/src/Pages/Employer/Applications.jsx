import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const host = "http://127.0.0.1:5000";

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const fetchJobApplications = async () => {
    try {
      const response = await fetch(`${host}/api/employer/jobapplication/${jobId}`, {
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      // const data = await response.json();
      setApplications(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setApplications([]); 
    }
  };

  return (
    <div>
      <h2>Job Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found for this job.</p>
      ) : (
        <ul>
          {applications.map((application) => (
            <li key={application._id}>
              <h3>{application.name}</h3>
              <p>{application.address}</p>
              <p>{application.experience}</p>
              <p>{application.duration}</p>
              <p>{application.education}</p>
              <p>{application.skills}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobApplications;
