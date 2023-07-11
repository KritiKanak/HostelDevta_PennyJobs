import React, { useState, useContext } from 'react';
import EmployerContext from '../../../context/Employer/employerContext';
import { makeStyles } from '@material-ui/core/styles';

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
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  formGroup: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
    },
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: theme.spacing(1),
    border: '1px solid #ccc',
    borderRadius: theme.spacing(0.5),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1, 2),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#45a049',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(0.5, 1),
      fontSize: '0.9rem',
    },
  },
}));

const EmployerUpdateProfileModal = ({ closeModal, employerId }) => {
  const classes = useStyles();
  const { updateEmDetails } = useContext(EmployerContext);

  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [size, setSize] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmDetails(employerId, companyName, address, size, type);
    closeModal();
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <h3>Update Employer Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className={classes.formGroup}>
            <label htmlFor="companyName" className={classes.label}>
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={classes.input}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="address" className={classes.label}>
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={classes.input}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="size" className={classes.label}>
              Size
            </label>
            <input
              type="text"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className={classes.input}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="type" className={classes.label}>
              Type
            </label>
            <input
              type="text"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={classes.input}
            />
          </div>
          <button type="submit" className={`btn btn-primary ${classes.submitButton}`}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployerUpdateProfileModal;
