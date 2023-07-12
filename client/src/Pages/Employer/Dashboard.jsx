import React from 'react';
import Navbar from '../../components/Employer/Navbar';
import AddJob from '../../components/Employer/DashComps/Addjob';
import PostFetch from '../../components/Employer/DashComps/PostFetch';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate('/employer/profile');
  };

  return (
    <>
      <Navbar />
      <div>
        <h3>Employer Dashboard</h3>
        <button onClick={handleNavigateToProfile}>View Profile</button>
      </div>
      <AddJob />
      <PostFetch />
      <Footer/>
    </>
  );
};

export default Dashboard;
