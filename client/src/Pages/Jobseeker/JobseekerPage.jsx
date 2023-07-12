import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Jobseeker/Navbar';
import AuthPage from './AuthPage';

const EmployerPage = () => {
  return (
    <>
      {/* <Navbar/> */}
      <div className="container mt-5">
        {/* <h1>JobSeeker Page</h1> */}
        <AuthPage/>
      </div>
    </>
  );
};

export default EmployerPage;
