import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    padding: theme.spacing(4, 0),
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2">
              Aamdani
            </Typography>
            <Typography variant="body2" component="p">
              A platform for connecting employers and Penny Job Workers.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" component="h3">
              Links
            </Typography>
            <ul>
              <li>
                <Link to="/" className={classes.link}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={classes.link}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className={classes.link}>
                  Contact
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" component="h3">
              Social Media
            </Typography>
            <ul>
              <li>
                <a href="https://www.facebook.com" className={classes.link} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" className={classes.link} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com" className={classes.link} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
