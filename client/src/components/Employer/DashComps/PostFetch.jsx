import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import JobPostingContext from '../../../context/Jobposting/JobpostContext';
import EditJobModal from './updatejob';

const host = "http://127.0.0.1:5000";

const JobsPostedByEmployer = () => {
  const [jobsPosted, setJobsPosted] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const { deleteJobPosting } = useContext(JobPostingContext);

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

  const toggleModal = (jobId) => {
    setSelectedJobId(jobId);
    setIsModalOpen(!isModalOpen);
  };
  
  const handleDelete = (id) => {
    deleteJobPosting(id);
    setJobsPosted(jobsPosted.filter((job) => job._id !== id));
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
              <button onClick={() => toggleModal(job._id)}>Edit</button>
              <button onClick={() => handleDelete(job._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && (
        <EditJobModal jobId={selectedJobId} closeModal={toggleModal} />
      )}
    </div>
  );
};

export default JobsPostedByEmployer;
