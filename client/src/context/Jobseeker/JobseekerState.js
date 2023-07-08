import React, { useState } from 'react';
import JobSeekerContext from './JobseekerContext';

const JobseekerState = (props) => {
  const host = "http://127.0.0.1:5000";

  const detailsInitial = [];
  const [jobSeekerDetails, setJobSeekerDetails] = useState(detailsInitial);

  const getJobSeekerDetails = async () => {
    try {
      const response = await fetch(`${host}/api/jobseekerdetails/fetchdetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setJobSeekerDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addJobSeekerDetails = async (name,address, experience, duration,education, skills) => {
    try {
      const response = await fetch(`${host}/api/jobseekerdetails/adddetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ name,address, experience, duration,education, skills }),
      });
      const data = await response.json();
      setJobSeekerDetails([...jobSeekerDetails, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteJobSeekerDetails = async (id) => {
    try {
      await fetch(`${host}/api/jobseekerdetails/deletedetail/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      setJobSeekerDetails(jobSeekerDetails.filter((detail) => detail._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateJobSeekerDetails = async (id, name,address, experience, duration,education, skills) => {
    try {
      const response = await fetch(
        `${host}/api/jobseekerdetails/updatedetails/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ name,address, experience, duration,education, skills }),
        }
      );
      const data = await response.json();
      setJobSeekerDetails(
        jobSeekerDetails.map((detail) =>
          detail._id === id ? { ...detail, ...data.jobSeekerDetail } : detail
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <JobSeekerContext.Provider
      value={{
        jobSeekerDetails,
        getJobSeekerDetails,
        addJobSeekerDetails,
        deleteJobSeekerDetails,
        updateJobSeekerDetails,
      }}
    >
      {props.children}
    </JobSeekerContext.Provider>
  );
};

export default JobseekerState;