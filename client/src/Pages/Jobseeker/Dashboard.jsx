import React from 'react';
import Navbar from '../../components/Navbar';
import FetchAllJobs from '../../components/Jobseeker/Dashcomps/fetchjobs';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate('/jobseeker/profile');
  };

  return (
    <>
      <Navbar />
      <h3>Job seeker Dashboard</h3>
      <button onClick={handleNavigateToProfile}>View Profile</button>
      <FetchAllJobs />
    </>
  );
};

export default Dashboard;
