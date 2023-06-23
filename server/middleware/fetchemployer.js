// const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'missionimpossible!'

// const fetchuser = (req,res, next)=>{
//     // Get the user from the jwt token and add id to req object
//     const token = req.header('auth-token');
//     if(!token) {
//         res.status(401).send({error: "Please authenticate using a valid token"})
//     }
//     try {
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data.user;
//         next();

//     }catch (error) {
//         res.status(401).send({ error: "Please authenticate using a valid token "})
//     }
// }


// module.exports = fetchuser

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'missionimpossible!';

const fetchUser = (req, res, next) => {
  // Get the user from the jwt token and add id and role to req object
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: 'Please authenticate using a valid token' });
  }
  
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;

    // Add role-based access control
    if (req.user.role !== 'employer') {
      return res.status(403).send({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate using a valid token' });
  }
};

module.exports = fetchUser;
