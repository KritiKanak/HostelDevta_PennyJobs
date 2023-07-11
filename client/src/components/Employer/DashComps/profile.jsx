import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Modal, TextField } from '@material-ui/core';
import EmployerContext from '../../../context/Employer/employerContext';
import UpdateProfileModal from './updatedetails';

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
  employerItem: {
    marginBottom: theme.spacing(2),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
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
  },
}));

const EmployerProfile = () => {
  const classes = useStyles();
  const { employerDetails, getEmDetails } = useContext(EmployerContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployerId, setSelectedEmployerId] = useState('');

  useEffect(() => {
    getEmDetails();
  }, []);

  const toggleModal = (employerId) => {
    setSelectedEmployerId(employerId);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.heading} style={{ color: 'cadetblue' }}>
        {employerDetails.length > 0 ? `${employerDetails[0].companyname}'s Profile` : 'Job Seeker Profile'}
      </Typography>
      {employerDetails.map((detail) => (
        <div key={detail._id} className={classes.employerItem}>
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            value={detail.companyname}
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
            label="Size"
            variant="outlined"
            fullWidth
            value={detail.size}
            className={classes.field}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Type"
            variant="outlined"
            fullWidth
            value={detail.type}
            className={classes.field}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={() => toggleModal(detail._id)}
          >
            Update Profile
          </Button>
        </div>
      ))}
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={toggleModal}
          className={classes.modal}
        >
          <div className={classes.modalContent}>
            <UpdateProfileModal employerId={selectedEmployerId} closeModal={toggleModal} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EmployerProfile;
