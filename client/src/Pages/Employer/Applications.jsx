import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const host = "http://127.0.0.1:5000";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60vw",
    },
  },
  card: {
    marginBottom: theme.spacing(2),
    borderRadius: "31px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  experience: {
    fontSize: "1rem",
    marginBottom: theme.spacing(1),
  },
  duration: {
    fontSize: "1rem",
    marginBottom: theme.spacing(1),
  },
  skills: {
    fontSize: "1rem",
    marginBottom: theme.spacing(1),
  },
  seeMoreButton: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const JobApplications = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(`${host}/api/employer/jobapplication/${jobId}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      console.log(response);
      setJobApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeeMoreInfo = (application) => {
    navigate(`/connect/${application._id}`, { application });
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h3" component="h3">
        Job Applications
      </Typography>
      {jobApplications.length === 0 ? (
        <Typography variant="body1" component="p">
          No applications found for this job.
        </Typography>
      ) : (
        <ul>
          {jobApplications.map((application) => (
            <Card key={application._id} className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" component="h5" className={classes.name}>
                  {application.name}
                </Typography>
                <Typography variant="body1" component="h5" className={classes.experience}>
                  Experience: {application.experience}
                </Typography>
                <Typography variant="body1" component="p" className={classes.duration}>
                  Duration: {application.duration}
                </Typography>
                <Typography variant="body1" component="p" className={classes.skills}>
                  Skills: {application.skills}
                </Typography>
                <Button
                  variant="contained"
                  className={classes.seeMoreButton}
                  onClick={() => handleSeeMoreInfo(application)}
                >
                  See More Info
                </Button>
              </CardContent>
            </Card>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default JobApplications;
