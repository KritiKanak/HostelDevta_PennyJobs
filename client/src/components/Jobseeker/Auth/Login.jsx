import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JobSeekerLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const host = "http://127.0.0.1:5000";

  // useEffect(() => {
  //   const checkJobSeekerDetails = async () => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const response = await fetch(`${host}/api/auth/jobseeker/getuser`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "auth-token": token,
  //         },
  //       });
  //       const json = await response.json();
  //       if (json._id) {
  //         // Job Seeker details exist, redirect to the job search page
  //         navigate("/");
  //       }
  //     }
  //   };

  //   checkJobSeekerDetails();
  // }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/jobseeker/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and check job seeker details
      localStorage.setItem("token", json.authtoken);
      navigate("/candidate/dashboard");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
      <div className="row align-items-center" style={{ height: "72vh" }}>
        <div className="col-md-4">
          <h2 className="my-2">Job Seeker Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerLogin;
