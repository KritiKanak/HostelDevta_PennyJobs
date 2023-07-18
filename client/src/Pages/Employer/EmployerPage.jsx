import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Employer/Navbar';
import Footer from '../../components/Footer';
import AuthPage from './AuthPage';

const EmployerPage = () => {
  return (
    <>
      {/* <Navbar/> */}
      <div className="container mt-5">
        {/* <h1>Employer Page</h1> */}
        <AuthPage/>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default EmployerPage;
