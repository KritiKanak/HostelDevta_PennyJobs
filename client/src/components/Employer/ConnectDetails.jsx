import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Card, CardContent, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Connect = ({ application }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          Candidate Details
        </Typography>
        <form className={classes.form}>
          <TextField
            label="Name"
            value={application.name}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Address"
            value={application.address}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Experience"
            value={application.experience}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Duration"
            value={application.duration}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Education"
            value={application.education}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Skills"
            value={application.skills}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button variant="contained" color="primary" className={classes.button}>
            Send Email
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Connect;
