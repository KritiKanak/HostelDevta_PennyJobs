import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import WorkIcon from "@material-ui/icons/Work";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Navbar from "../../components/Jobseeker/Navbar";
import Footer from "../../components/Footer";

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
      navigate("/candidate/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  if (!jobPostings) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar/>
      <div
        style={{
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <div style={{ marginRight:"32vw",fontFamily:'sans-serif', fontSize:'xxx-large', color:'powderblue' }}>
          <h2>Job Details</h2>
        </div>
        <div
          style={{
            display: "flex",
            width: "50vw",
            height: "60vh",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ marginBottom: "1rem" , fontSize:"xxx-large", color:"dimgrey" }}>
            {jobPostings.companyname}
          </h3>
          <h4 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
            {jobPostings.title}
          </h4>
          <p style={{ marginBottom: "1rem", fontSize: "medium" }}>
            Description: {jobPostings.description}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <WorkIcon style={{ marginRight: "0.5rem",  }} />
            <p style={{ marginRight: "1rem" }}>{jobPostings.jobtype}</p>
            <MonetizationOnIcon style={{ marginRight: "0.5rem" }} />
            <p style={{ marginRight: "1rem" }}>{jobPostings.salary}</p>
            <LocationOnIcon style={{ marginRight: "0.5rem" }} />
            <p>{jobPostings.location}</p>
          </div>
          <button
            onClick={handleApply}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default JobDetails;
