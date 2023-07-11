import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import JobSeekerContext from '../../../context/Jobseeker/JobseekerContext';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    padding: theme.spacing(4),
  },
  formGroup: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const UpdateProfileModal = ({ closeModal, jobId }) => {
  const classes = useStyles();
  const { updateJobSeekerDetails } = useContext(JobSeekerContext);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('');
  const [duration, setDuration] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJobSeekerDetails(jobId, name, address, experience, duration, education, skills, file);
    closeModal();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <h3>Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className={classes.formGroup}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              label="Experience"
              variant="outlined"
              fullWidth
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              label="Duration"
              variant="outlined"
              fullWidth
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              label="Education"
              variant="outlined"
              fullWidth
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              label="Skills"
              variant="outlined"
              fullWidth
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="file">Upload File</label>
            <input type="file" id="file" onChange={handleFileChange} />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
