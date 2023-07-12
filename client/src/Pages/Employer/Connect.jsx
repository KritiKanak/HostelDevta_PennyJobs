import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import Skeleton from "react-loading-skeleton";
import Navbar from "../../components/Employer/Navbar"
import Footer from "../../components/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "80vw",
    margin: "auto",
    marginTop: "8vh",
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  documentPreviewModal: {
    backdropFilter: "blur(3px)",
  },
  documentPreview: {
    width: "100%",
    height: 500,
  },
  successModal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  successIcon: {
    fontSize: 80,
    color: theme.palette.success.main,
    marginBottom: theme.spacing(2),
  },
  errorModal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  errorIcon: {
    fontSize: 80,
    color: theme.palette.error.main,
    marginBottom: theme.spacing(2),
  },
  errorMessage: {
    marginBottom: theme.spacing(2),
  },
}));

const ConnectPage = () => {
  const host = "http://127.0.0.1:5000";
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [emailBody, setEmailBody] = useState("");
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    fetchJobApplication();
  }, []);

  const fetchJobApplication = async () => {
    try {
      const response = await axios.get(`${host}/api/employer/fetchapplication/${id}`);
      setApplication(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendEmail = async () => {
    try {
      const response = await axios.get(`${host}/employer/send-email/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      console.log(response.data); // Log the response from the server
      setShowSuccessModal(true);
      // Perform any additional actions after sending the email, e.g., show success message, update UI, etc.
    } catch (error) {
      console.error(error);
      setShowErrorModal(true);
      // Handle error, e.g., show error message, update UI, etc.
    }
  };

  const handleEmailBodyChange = (event) => {
    setEmailBody(event.target.value);
  };

  const handleDocumentPreviewOpen = () => {
    setShowDocumentPreview(true);
  };

  const handleDocumentPreviewClose = () => {
    setShowDocumentPreview(false);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      <Navbar/>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h3" component="h3" className={classes.title}>
            Candidate Details
          </Typography>
          {application ? (
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

              {application.fileDownloadURL && (
                <div>
                  <Button variant="contained" color="primary" className={classes.submitButton} onClick={handleDocumentPreviewOpen}>
                    View Document
                  </Button>
                  <Dialog open={showDocumentPreview} onClose={handleDocumentPreviewClose} className={classes.documentPreviewModal}>
                    <DialogTitle>Document Preview</DialogTitle>
                    <DialogContent style={{ width: "60vw" }}>
                      <iframe src={application.fileDownloadURL} className={classes.documentPreview} title="Document Preview"></iframe>
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              <Button variant="contained" style={{backgroundColor:"#029c02e6", color:"white"}} className={classes.submitButton} onClick={sendEmail}>
                Send Email
              </Button>

              <Dialog open={showSuccessModal} onClose={handleSuccessModalClose}>
                <div className={classes.successModal}>
                  <CheckCircleOutlineIcon className={classes.successIcon} />
                  <Typography variant="h6" className={classes.successMessage}>
                    Email Sent Successfully!
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleSuccessModalClose}>
                    Close
                  </Button>
                </div>
              </Dialog>

              <Dialog open={showErrorModal} onClose={handleErrorModalClose}>
                <div className={classes.errorModal}>
                  <CancelOutlinedIcon className={classes.errorIcon} />
                  <Typography variant="h6" className={classes.errorMessage}></Typography>
                  <CancelOutlinedIcon className={classes.errorIcon} />
                  <Typography variant="h6" className={classes.errorMessage}>
                    Email Not Sent. Please try again.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleErrorModalClose}>
                    Close
                  </Button>
                </div>
              </Dialog>
            </form>
          ) : (
            <Skeleton height={400} count={6} />
          )}
        </CardContent>
      </Card>
      <Footer/>
    </>
  );
};

export default ConnectPage;
