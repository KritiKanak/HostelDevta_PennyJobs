import React from 'react';
import Navbar from '../../components/Navbar';
import FetchAllJobs from '../../components/Jobseeker/Dashcomps/fetchjobs';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate('/jobseeker/profile');
  };

  const handleNavigateToApplied = () => {
    navigate('/jobseeker/job-applied')
  }

  return (
    <>
      <Navbar />
      <h3>Job seeker Dashboard</h3>
      <button onClick={handleNavigateToProfile}>View Profile</button>
      <button onClick={handleNavigateToApplied}>Jobs Applied</button>
      <FetchAllJobs />
    </>
  );
};

export default Dashboard;
