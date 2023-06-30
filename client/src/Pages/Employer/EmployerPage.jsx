import React from 'react';
import { Link } from 'react-router-dom';
import AuthPage from './AuthPage';

const EmployerPage = () => {
  return (
    <div className="container mt-5">
      <h1>Employer Page</h1>
      <AuthPage/>
    </div>
  );
};

export default EmployerPage;
