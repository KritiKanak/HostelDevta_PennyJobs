import React from 'react';
import Navbar from '../../components/Jobseeker/Navbar';
import FetchAllJobs from '../../components/Jobseeker/Dashcomps/fetchjobs';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate('/candidate/profile');
  };

  const handleNavigateToApplied = () => {
    navigate('/candidate/job-applied')
  }

  return (
    <>
      <Navbar />
      <h3>Job seeker Dashboard</h3>
      <button onClick={handleNavigateToProfile}>View Profile</button>
      <button onClick={handleNavigateToApplied}>Jobs Applied</button>
      <FetchAllJobs />
      <Footer/>
    </>
  );
};

export default Dashboard;
