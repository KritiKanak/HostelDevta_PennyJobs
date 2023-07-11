import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, Box, TextField, Modal } from '@material-ui/core';
import JobSeekerContext from '../../../context/Jobseeker/JobseekerContext';
import { Link } from 'react-router-dom';
import UpdateProfileModal from './updateDetails';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  profileItem: {
    marginBottom: theme.spacing(2),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  documentPreview: {
    width: '100%',
    minHeight: '200px',
    border: 'none',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    padding: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPreview: {
    width: '80vh',
    height: '80vh',
  },
}));

const JobSeekerProfile = () => {
  const classes = useStyles();
  const { jobSeekerDetails, getJobSeekerDetails } = useContext(JobSeekerContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');

  useEffect(() => {
    getJobSeekerDetails();
  }, []);

  const toggleModal = (jobId) => {
    setSelectedJobId(jobId);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container className={classes.container} align="center">
      <Typography variant="h4" className={classes.heading} style={{color:'cadetblue'}}>
        {jobSeekerDetails.length > 0 ? `${jobSeekerDetails[0].name}'s Profile` : 'Job Seeker Profile'}
      </Typography>

      {jobSeekerDetails.map((detail) => (
        <Box key={detail._id} className={classes.profileItem} border={1} p={2} component="form">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={detail.name}
            className={classes.field}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={detail.address}
            className={classes.field}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Experience"
            variant="outlined"
            fullWidth
            value={detail.experience}
            className={classes.field}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Duration"
            variant="outlined"
            fullWidth
            value={detail.duration}
            className={classes.field}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Education"
            variant="outlined"
            fullWidth
            value={detail.education}
            className={classes.field}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Skills"
            variant="outlined"
            fullWidth
            value={detail.skills}
            className={classes.field}
            InputProps={{
              readOnly: true,
            }}
          />
          {detail.fileDownloadURL && (
            <div>
              <Typography variant="h6" className={classes.field}>Document Preview:</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => toggleModal(detail._id)}
              >
                View Document
              </Button>
              <Modal
                open={isModalOpen}
                onClose={toggleModal}
                className={classes.modal}
              >
                <div className={classes.modalContent}>
                  <iframe
                    src={detail.fileDownloadURL}
                    className={classes.modalPreview}
                    title="Document Preview"
                  ></iframe>
                </div>
              </Modal>
            </div>
          )}
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={() => toggleModal(detail._id)}
          >
            Update Profile
          </Button>
        </Box>
      ))}
    </Container>
  );
};

export default JobSeekerProfile;
