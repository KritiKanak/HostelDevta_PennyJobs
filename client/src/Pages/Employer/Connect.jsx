import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ConnectPage = () => {
  const host = "http://127.0.0.1:5000";
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [emailBody, setEmailBody] = useState("");

  useEffect(() => {
    fetchJobApplication();
  }, []);

  const fetchJobApplication = async () => {
    try {
      const response = await axios.get(
        `${host}/api/employer/fetchapplication/${id}`
      );
      setApplication(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(application.email)
  const sendEmail = async () => {
    try {
      const response = await axios.get(`${host}/employer/send-email/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      console.log(response.data); // Log the response from the server
      // Perform any additional actions after sending the email, e.g., show success message, update UI, etc.
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show error message, update UI, etc.
    }
  };

  const handleEmailBodyChange = (event) => {
    setEmailBody(event.target.value);
  };

  return (
    <div>
      <h2>Connect Page</h2>
      {application ? (
        <div>
          <h3>Name: {application.name}</h3>
          <p>Address: {application.address}</p>
          <p>Experience: {application.experience}</p>
          <p>Duration: {application.duration}</p>
          <p>Education: {application.education}</p>
          <p>Skills: {application.skills}</p>
          {application.fileDownloadURL && (
            <div>
              <h4>Document Preview:</h4>
              <iframe src={application.fileDownloadURL} width="100%" height="500px" title="Document Preview"></iframe>
            </div>
          )}
        </div>
        
      ) : (
        <p>Loading...</p>
      )}


      <div>
        {application ? (
          <div>
            {/* <input value={application.email} disabled /> */}
            {/* <textarea value={emailBody} onChange={handleEmailBodyChange} /> */}

            <button onClick={sendEmail}>Send Email</button>
          </div>
        ) : (
          <p>Email Retrieving...</p>
        )}
      </div>
    </div>
  );
};

export default ConnectPage;
