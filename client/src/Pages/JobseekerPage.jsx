import React from 'react';
import { Link } from 'react-router-dom';

const EmployerPage = () => {
  return (
    <div className="container mt-5">
      <h1>Employer Page</h1>
      <p>Please choose an option:</p>
      <div className="d-grid gap-3 col-6 mx-auto">
        <Link to="/jobseeker-login" className="btn btn-primary btn-lg">
          Login
        </Link>
        <Link to="/jobseeker-signup" className="btn btn-success btn-lg">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default EmployerPage;
