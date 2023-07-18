import React, { useRef, useEffect } from 'react';
import Navbar from '../../components/Employer/Navbar';
import AddJob from '../../components/Employer/DashComps/Addjob';
import PostFetch from '../../components/Employer/DashComps/PostFetch';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { Typography, Button, makeStyles, Grid } from '@material-ui/core';
import './dashboardem.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5', // Set the background color for the whole page
  },
  container: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2), // Add some padding to the container
  },
  buttonsContainer: {
    textAlign: 'center',
    marginBottom: theme.spacing(2), // Add some margin at the bottom
  },
  buttonWidth: {
    width: '70%',
    marginTop: '1.5vh',
    marginBottom: '1.5vh',
    fontSize: '14px',
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: '#2196F3', // Change the button background color
    color: '#fff', // Change the button text color
    '&:hover': {
      backgroundColor: '#0d47a1', // Change the button background color on hover
    },
  },
  smallerPart: {
    flexBasis: '50%',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2), // Add some padding to the smaller part
  },
  largerPart: {
    flexBasis: '50%',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'auto',
    maxHeight: '70vh',
    padding: theme.spacing(2), // Add some padding to the larger part
    backgroundColor: '#fff', // Set the background color for the larger part
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', // Add a box shadow
  },
  fetchJobsContainer: {
    width: '100%', // Set the width to 100% to fill the container
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const largerPartRef = useRef(null);

  const handleNavigateToProfile = () => {
    navigate('/employer/profile');
  };

  useEffect(() => {
    // Check if the content in the larger part exceeds the height and add a custom class for styling
    if (largerPartRef.current) {
      const { scrollHeight, clientHeight } = largerPartRef.current;
      if (scrollHeight > clientHeight) {
        largerPartRef.current.classList.add('scrollable');
      } else {
        largerPartRef.current.classList.remove('scrollable');
      }
    }
  }, []);

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.container}>
        <Typography variant="h5" component="h3" gutterBottom>
          Employer Dashboard
        </Typography>
        <div className={classes.buttonsContainer}>
          <Button variant="contained" className={classes.buttonWidth} onClick={handleNavigateToProfile} fullWidth>
            Edit Profile
          </Button>
        </div>
      </div>
      <Grid container spacing={2} style={{display:'flex', justifyContent:'center'}}>
        {/* Smaller part */}
        <Grid item xs={12} md={4} className={classes.smallerPart}>
          <div>
            <AddJob />
          </div>
        </Grid>
        {/* Larger part */}
        <Grid item xs={12} md={8} className={classes.largerPart}>
          <div ref={largerPartRef} className={classes.fetchJobsContainer}>
            <PostFetch />
          </div>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Dashboard;
