import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

const host = "http://127.0.0.1:5000";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobPostings, setJobDetails] = useState(null);

  useEffect(() => {
    getJobDetails();
  }, []);
  
  const getJobDetails = async () => {
    try {
      const response = await fetch(`${host}/fetch/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setJobDetails(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleApply = async () => {
    try {
      const response = await fetch(`${host}/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      // Handle the response after applying for the job, e.g., show success message
      // console.log(response.data);
      navigate("/jobseeker/dashboard")
    } catch (error) {
      console.error(error);
    }
  };

  if (!jobPostings) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Job Details</h2>
      <h3>{jobPostings.companyname}</h3>
      <h3>{jobPostings.title}</h3>
      <h4>{jobPostings.jobtype}</h4>
      <p>{jobPostings.description}</p>
      <p>{jobPostings.salary}</p>
      <p>{jobPostings.location}</p>
      {/* Display other job details */}
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default JobDetails;
