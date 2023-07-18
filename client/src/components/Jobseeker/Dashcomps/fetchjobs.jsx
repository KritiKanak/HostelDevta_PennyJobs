import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const AllJobs = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    getJobPostings();
  }, []);

  const getJobPostings = async () => {
    try {
      const response = await fetch(`${host}/fetchjobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const sortedJobs = data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      setJobPostings(sortedJobs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleJobDetails = (jobId) => {
    navigate(`/fetch/${jobId}`);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" component="h2" gutterBottom>
        Jobs
      </Typography>
      <div className={classes.cardContainer}>
        {jobPostings.map((job) => (
          <Card key={job._id} className={classes.jobCard}>
            <CardContent>
              <Typography variant="h5" component="h3" className={classes.title}>
                {job.companyname}
              </Typography>
              <Typography variant="h6" component="h4" gutterBottom>
                {job.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {job.jobtype}
              </Typography>
              <Typography variant="body1" component="p">
                Salary: {job.salary}
              </Typography>
              <Typography variant="body1" component="p">
                Location: {job.location}
              </Typography>
              <Button
                variant="contained"
                className={classes.detailsButton}
                onClick={() => handleJobDetails(job._id)}
              >
                Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
