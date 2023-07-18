import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import JobPostingContext from '../../../context/Jobposting/JobpostContext';
import { makeStyles, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  addJobContainer: {
    padding: theme.spacing(2),
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '25vw', // Add width of 40vw
    margin: 'auto', // Center the form horizontally
  },
  inputField: {
    marginBottom: theme.spacing(1),
  },
  addButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
}));

const AddJob = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const jobPostingContext = useContext(JobPostingContext);

  const [jobDetails, setJobDetails] = useState({
    title: '',
    jobType: '',
    description: '',
    location: '',
    salary: '',
  });

  const { title, jobType, description, location, salary } = jobDetails;

  const handleChange = (e) => {
    setJobDetails({
      ...jobDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add job posting
      await jobPostingContext.addJobPosting(title, jobType, description, location, salary);

      // Clear the form by resetting the jobDetails state
      setJobDetails({
        title: '',
        jobType: 'contractual',
        description: '',
        location: '',
        salary: '',
      });

      // Redirect to employer details page
      // navigate('/employer/details');
    } catch (error) {
      console.error('Failed to add job posting:', error);
    }
  };

  return (
    <div className={classes.addJobContainer}>
      <Typography variant="h4">Add Job</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={title}
          onChange={handleChange}
          required
          variant="outlined"
          className={classes.inputField}
        />
        <FormControl variant="outlined" className={classes.inputField}>
          <InputLabel>Job Type</InputLabel>
          <Select
            label="Job Type"
            name="jobType"
            value={jobType}
            onChange={handleChange}
            required
          >
            <MenuItem value="contractual">Contractual</MenuItem>
            <MenuItem value="fulltime">Full-Time</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          name="description"
          value={description}
          onChange={handleChange}
          required
          variant="outlined"
          multiline
          rows={3}
          className={classes.inputField}
        />
        <TextField
          label="Location"
          name="location"
          value={location}
          onChange={handleChange}
          required
          variant="outlined"
          className={classes.inputField}
        />
        <TextField
          label="Salary"
          name="salary"
          value={salary}
          onChange={handleChange}
          required
          variant="outlined"
          className={classes.inputField}
        />
        <Button type="submit" variant="contained" className={classes.addButton}>
          Add Job
        </Button>
      </form>
    </div>
  );
};

export default AddJob;
