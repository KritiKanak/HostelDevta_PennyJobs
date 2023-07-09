import React, { useState } from 'react';
import JobPostingContext from './JobpostContext';

const JobPostingState = (props) => {
  const host = "http://127.0.0.1:5000";

  const initialState = [];
  const [jobPostings, setJobPostings] = useState(initialState);

  const getJobPostings = async () => {
    try {
      const response = await fetch(`${host}/api/employer/fetch`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setJobPostings(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addJobPosting = async (title, jobtype, description, location, salary) => {
    try {
      const response = await fetch(`${host}/api/employer/addjob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, jobtype, description, location, salary }),
      });
      const data = await response.json();
      console.log(data)
      setJobPostings([...jobPostings, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteJobPosting = async (id) => {
    try {
      await fetch(`${host}/api/employer/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      setJobPostings(jobPostings.filter((posting) => posting._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateJobPosting = async (id, title, jobtype, description, location, salary) => {
    try {
      const response = await fetch(`${host}/api/employer/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, jobtype, description, location, salary }),
      });
      const data = await response.json();
      setJobPostings(
        jobPostings.map((posting) =>
          posting._id === id ? { ...posting, ...data } : posting
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <JobPostingContext.Provider
      value={{
        jobPostings,
        getJobPostings,
        addJobPosting,
        deleteJobPosting,
        updateJobPosting,
      }}
    >
      {props.children}
    </JobPostingContext.Provider>
  );
};

export default JobPostingState;
