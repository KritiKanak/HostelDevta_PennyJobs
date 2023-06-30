import React, { useState } from 'react';
import employerContext from './employerContext';

const EmployerState = (props) => {
  const host = "http://127.0.0.1:5000";

  const detailsInitial = [];
  const [employerDetails, setEmployerDetails] = useState(detailsInitial);

  const getEmDetails = async () => {
    try {
      const response = await fetch(`${host}/api/employerdetails/fetchdetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setEmployerDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addEmDetails = async (companyname, address, size, type) => {
    try {
      const response = await fetch(`${host}/api/employerdetails/adddetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ companyname, address, size, type }),
      });
      const data = await response.json();
      setEmployerDetails([...employerDetails, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmDetails = async (id) => {
    try {
      await fetch(`${host}/api/employerdetails/deletedetail/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      setEmployerDetails(employerDetails.filter((detail) => detail._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateEmDetails = async (id, companyname, address, size, type) => {
    try {
      const response = await fetch(
        `${host}/api/employerdetails/updatedetails/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ companyname, address, size, type }),
        }
      );
      const data = await response.json();
      setEmployerDetails(
        employerDetails.map((detail) =>
          detail._id === id ? { ...detail, ...data.employerDetail } : detail
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <employerContext.Provider
      value={{
        employerDetails,
        getEmDetails,
        addEmDetails,
        deleteEmDetails,
        updateEmDetails,
      }}
    >
      {props.children}
    </employerContext.Provider>
  );
};

export default EmployerState;
