import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../../Footer';
import { Typography, Card, CardContent, Button, makeStyles } from '@material-ui/core';


const host = 'http://127.0.0.1:5000';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '40vw',
    margin: '0 auto',
    padding: theme.spacing(2),
  },
  cardContainer: {
    height: '80vh', // Set the desired height for the container
    overflowY: 'auto',
  },
  jobCard: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.spacing(1),
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    fontFamily: 'Arial, sans-serif',
  },
  detailsButton: {
    marginLeft: 'auto',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontFamily: 'Arial, sans-serif',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
}));

const JobAppliedPage = () => {
  const classes = useStyles(); // Use the same styles hook for JobAppliedPage
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(`${host}/api/jobseeker/jobs-applied`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const sortedApplications = response.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      console.log(response.data);
      setJobApplications(sortedApplications);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <Navbar/> */}
      <div className={classes.container}>
        <Typography variant="h4" component="h2" gutterBottom>
          Jobs Applied
        </Typography>
        {jobApplications.length === 0 ? (
          <p>No jobs applied yet.</p>
        ) : (
          <div className={classes.cardContainer}>
            {jobApplications.map((jobApplication) => (
              <Card key={jobApplication._id} className={classes.jobCard}>
                <CardContent>
                  <Typography variant="h5" component="h3" className={classes.title}>
                    {jobApplication.job.companyname}
                  </Typography>
                  <Typography variant="h6" component="h4" gutterBottom>
                    {jobApplication.job.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {jobApplication.job.jobtype}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Description: {jobApplication.job.description}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Salary: {jobApplication.job.salary}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Location: {jobApplication.job.location}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default JobAppliedPage;
