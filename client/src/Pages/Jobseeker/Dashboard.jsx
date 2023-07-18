import React, { useState } from 'react';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import Navbar from '../../components/Jobseeker/Navbar';
import FetchAllJobs from '../../components/Jobseeker/Dashcomps/fetchjobs';
import JobsApplied from '../../components/Jobseeker/Dashcomps/JobsApplied'; // Import the JobsApplied component
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  container: {
    marginTop: theme.spacing(2),
  },
  buttonsContainer: {
    textAlign: 'center',
  },
  buttonWidth: {
    width: '70%',
    marginTop: '1.5vh',
    marginBottom: '1.5vh',
  },
  fetchJobsContainer: {
    minHeight: '50vh',
    overflowY: 'auto', // Enable vertical scrolling if content exceeds container height
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showJobsApplied, setShowJobsApplied] = useState(false); // State variable to toggle between components

  const handleNavigateToProfile = () => {
    navigate('/candidate/profile');
  };

  const handleNavigateToApplied = () => {
    setShowJobsApplied(true); // Update state to show the JobsApplied component
  };

  const handleBackToAllJobs = () => {
    setShowJobsApplied(false); // Update state to show the FetchAllJobs component
  };

  return (
    <div className={classes.root}>
      <Navbar />
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} md={4}>
          <div className={classes.buttonsContainer}>
            <Typography variant="h5" component="h3" gutterBottom>
              Dashboard
            </Typography>
            <Button variant="contained" className={classes.buttonWidth} onClick={handleNavigateToProfile} fullWidth>
              View Profile
            </Button>
            {/* Conditionally render buttons based on the state */}
            {!showJobsApplied ? (
              <Button variant="contained" className={classes.buttonWidth} onClick={handleNavigateToApplied} fullWidth>
                Jobs Applied
              </Button>
            ) : (
              <Button variant="contained" className={classes.buttonWidth} onClick={handleBackToAllJobs} fullWidth>
                Back to All Jobs
              </Button>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          {/* Render the appropriate component based on the state */}
          {!showJobsApplied ? (
            <div className={classes.fetchJobsContainer}>
              <FetchAllJobs />
            </div>
          ) : (
            <div className={classes.fetchJobsContainer}>
              <JobsApplied />
            </div>
          )}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Dashboard;
