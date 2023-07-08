import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const host = "http://127.0.0.1:5000";

const JobApplications = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(
        `${host}/api/employer/jobapplication/${jobId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      setJobApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConnect = (application) => {
    navigate("/connect", { application });
  };

  return (
    <div>
      <h2>Job Applications</h2>
      {jobApplications.length === 0 ? (
        <p>No applications found for this job.</p>
      ) : (
        <ul>
          {jobApplications.map((application) => (
            <li key={application._id}>
              <h4>{application._id}</h4>
              <h3>{application.name}</h3>
              <p>{application.address}</p>
              <p>{application.experience}</p>
              <p>{application.duration}</p>
              <p>{application.education}</p>
              <p>{application.skills}</p>
              <Link to={`/connect/${application._id}`}>Connect</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobApplications;
