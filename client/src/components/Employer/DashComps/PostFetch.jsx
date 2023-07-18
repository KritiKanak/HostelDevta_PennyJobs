import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import JobPostingContext from '../../../context/Jobposting/JobpostContext';
import EditJobModal from './updatejob';
import { Card, CardContent, Typography, Button, makeStyles, Grid } from '@material-ui/core';

const host = "http://127.0.0.1:5000";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.spacing(1),
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  detailsButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  cardContent: {
    textAlign: 'center',
  },
  container: {
    textAlign: 'center',
  },
  
}));

const JobsPostedByEmployer = () => {
  const classes = useStyles();
  const [jobsPosted, setJobsPosted] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const { deleteJobPosting } = useContext(JobPostingContext);

  useEffect(() => {
    fetchJobsPosted();
  }, []);

  const fetchJobsPosted = async () => {
    try {
      const response = await axios.get(`${host}/api/employer/fetch`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      setJobsPosted(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModal = (jobId) => {
    setSelectedJobId(jobId);
    setIsModalOpen(!isModalOpen);
  };
  
  const handleDelete = (id) => {
    deleteJobPosting(id);
    setJobsPosted(jobsPosted.filter((job) => job._id !== id));
  };

  const reversedJobsPosted = [...jobsPosted].reverse();

  return (
    <div className={classes.container}>
      <Typography variant="h4" gutterBottom>Jobs Posted</Typography>
      {jobsPosted.length === 0 ? (
        <Typography variant="body1">No jobs posted yet.</Typography>
      ) : (
        reversedJobsPosted.map((job) => (
          <Card key={job._id} className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h3" className={classes.title}>
                {job.title}
              </Typography>
              <Typography variant="subtitle1">
                {job.jobtype}
              </Typography>
              <Typography variant="body1">
                {job.description}
              </Typography>
              <Typography variant="body1">
                Location: {job.location}
              </Typography>
              <Typography variant="body1">
                Salary: {job.salary}
              </Typography>
              <div className={classes.buttonContainer}>
                <Button
                  component={Link}
                  to={`/applications/${job._id}`}
                  variant="contained"
                  className={classes.detailsButton}
                >
                  View Applications
                </Button>
                <Button
                  variant="contained"
                  className={classes.deleteButton}
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  className={classes.detailsButton}
                  onClick={() => toggleModal(job._id)}
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
      {isModalOpen && (
        <EditJobModal jobId={selectedJobId} closeModal={toggleModal} />
      )}
    </div>
  );
};

export default JobsPostedByEmployer;
