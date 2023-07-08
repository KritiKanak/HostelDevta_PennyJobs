const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../../middleware/fetchuser');
const JSDetails = require('../../models/JSdetails');
const { bucket } = require('../../firebaseInitialisation'); // Assuming you've set up the Firebase Admin in the service file

// Multer configuration for file upload
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route 1: Get all the JSDetails using GET "/api/jsdetails/fetchdetails". Login required
router.get('/fetchdetails', fetchuser, async (req, res) => {
  try {
    const jsdetails = await JSDetails.find({ user: req.user.id });
    res.json(jsdetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route 2: Add a new JSDetail using POST "/api/jsdetails/adddetails". Login required
router.post(
  '/adddetails',
  fetchuser,
  upload.single('file'), // Multer middleware to handle file upload
  [
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('experience', 'Experience must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { name, address, experience, duration, education, skills } = req.body;

      // If there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Get the file from the request
      const file = req.file;

      // Upload the file to Firebase Storage
      const fileUploadPromise = new Promise((resolve, reject) => {
        if (!file) {
          resolve(null); // If no file is uploaded, resolve with null
        } else {
          const fileUpload = bucket.file(file.originalname);
          const blobStream = fileUpload.createWriteStream({
            metadata: {
              contentType: file.mimetype,
            },
          });

          blobStream.on('error', (error) => {
            reject(error);
          });

          blobStream.on('finish', () => {
            // The file has been uploaded successfully
            // Get the public URL of the uploaded file
            fileUpload.getSignedUrl({
              action: 'read',
              expires: '03-17-2025', // Set the expiration date of the URL
            }, (error, url) => {
              if (error) {
                reject(error);
              } else {
                resolve(url);
              }
            });
          });

          blobStream.end(file.buffer);
        }
      });

      // Wait for the file upload promise to resolve
      const fileDownloadURL = await fileUploadPromise;

      // Create a new JSDetails document
      const jsdetail = new JSDetails({
        user: req.user.id,
        name,
        address,
        experience,
        duration,
        education,
        skills,
        fileDownloadURL, // Save the file download URL in the document
      });

      const savedJSDetails = await jsdetail.save();
      res.json(savedJSDetails);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// router.post(
//   '/adddetails',
//   fetchuser,
//   upload.fields([
//     { name: 'aadharfile', maxCount: 1 },
//     { name: 'schoolcertificatefile', maxCount: 1 }
//   ]),
//   [
//     body('name', 'Enter a Valid Name').isLength({ min: 3 }),
//     body('experience', 'Experience must be at least 5 characters').isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     try {
//       const { name, address, experience, duration, education, skills } = req.body;

//       // If there are errors, return bad request and the errors
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       // Get the files from the request
//       const aadharFile = req.files['aadharfile'][0];
//       const schoolCertificateFile = req.files['schoolcertificatefile'][0];

//       // Upload the files to Firebase Storage
//       const uploadPromises = [];
//       const fileDownloadURLs = {};

//       // Upload Aadhar File
//       if (aadharFile) {
//         const aadharFileUploadPromise = new Promise((resolve, reject) => {
//           const fileUpload = bucket.file(aadharFile.originalname);
//           const blobStream = fileUpload.createWriteStream({
//             metadata: {
//               contentType: aadharFile.mimetype,
//             },
//           });

//           blobStream.on('error', (error) => {
//             reject(error);
//           });

//           blobStream.on('finish', () => {
//             fileUpload.getSignedUrl(
//               {
//                 action: 'read',
//                 expires: '03-17-2025',
//               },
//               (error, url) => {
//                 if (error) {
//                   reject(error);
//                 } else {
//                   resolve(url);
//                 }
//               }
//             );
//           });

//           blobStream.end(aadharFile.buffer);
//         });

//         uploadPromises.push(aadharFileUploadPromise);
//       }

//       // Upload School Certificate File
//       if (schoolCertificateFile) {
//         const schoolCertificateFileUploadPromise = new Promise((resolve, reject) => {
//           const fileUpload = bucket.file(schoolCertificateFile.originalname);
//           const blobStream = fileUpload.createWriteStream({
//             metadata: {
//               contentType: schoolCertificateFile.mimetype,
//             },
//           });

//           blobStream.on('error', (error) => {
//             reject(error);
//           });

//           blobStream.on('finish', () => {
//             fileUpload.getSignedUrl(
//               {
//                 action: 'read',
//                 expires: '03-17-2025',
//               },
//               (error, url) => {
//                 if (error) {
//                   reject(error);
//                 } else {
//                   resolve(url);
//                 }
//               }
//             );
//           });

//           blobStream.end(schoolCertificateFile.buffer);
//         });

//         uploadPromises.push(schoolCertificateFileUploadPromise);
//       }

//       // Wait for all the file upload promises to resolve
//       const fileDownloadURLsArray = await Promise.all(uploadPromises);
//       const aadharFileDownloadURL = fileDownloadURLsArray[0] || null;
//       const schoolCertificateFileDownloadURL = fileDownloadURLsArray[1] || null;

//       // Create a new JSDetails document
//       const jsdetail = new JSDetails({
//         user: req.user.id,
//         name,
//         address,
//         experience,
//         duration,
//         education,
//         skills,
//         aadharfileurl: aadharFileDownloadURL, // Save the Aadhar file download URL
//         schoolcertificateurl: schoolCertificateFileDownloadURL, // Save the school certificate file download URL
//       });

//       const savedJSDetails = await jsdetail.save();
//       res.json(savedJSDetails);
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send('Internal Server Error');
//     }
//   }
// );



// Route 3: Update an existing JSDetail using PUT "/api/jsdetails/updatedetails/:id". Login required

router.put('/updatedetails/:id', fetchuser, async (req, res) => {
  const { name, address, experience, duration, education, skills } = req.body;

  try {
    const newJSDetails = {};
    if (name) newJSDetails.name = name;
    if (address) newJSDetails.address = address;
    if (experience) newJSDetails.experience = experience;
    if (duration) newJSDetails.duration = duration;
    if (education) newJSDetails.education = education;
    if (skills) newJSDetails.skills = skills;

    let jsdetail = await JSDetails.findById(req.params.id);
    if (!jsdetail) {
      return res.status(404).send('Not Found');
    }

    if (jsdetail.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed');
    }

    jsdetail = await JSDetails.findByIdAndUpdate(
      req.params.id,
      { $set: newJSDetails },
      { new: true }
    );

    res.json({ jsdetail });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route 4: Delete an existing JSDetail using DELETE "/api/jsdetails/deletedetail/:id". Login required
router.delete('/deletedetail/:id', fetchuser, async (req, res) => {
  try {
    let jsdetail = await JSDetails.findById(req.params.id);
    if (!jsdetail) {
      return res.status(404).send('Not Found');
    }

    if (jsdetail.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed');
    }

    jsdetail =await JSDetails.findByIdAndDelete(req.params.id);
    res.json({ Success: 'JSDetails has been deleted'});
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
