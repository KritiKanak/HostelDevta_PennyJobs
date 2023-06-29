const express = require('express')
const Employer = require('../../models/Employer')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const fetchemployer = require('../../middleware/fetchemployer')

const JWT_SECRET = 'missionimpossible!'

//Route 1: Create a user using: POST "/api/auth/"  Doesn't require Auth
router.post('/createuser',[
    body('name','Enter a Valid Company Name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5}),
], async(req,res)=>{
    let success = false

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() })
    }
 
    try{
        let user = await Employer.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success, error:" Employer with this email already exists"})
        } 
    
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await Employer.create({
            role:'employer',
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });
        const data = {
            user:{
                id: user.id,
                role:user.role
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        // console.log(jwtData)
        success = true;
        res.json({ success,authtoken})

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error"); 
    }
})

//Route 2: Authenticate a Employer using: POst "/api/auth/login" , NO Login Required
router.post('/login',[
    // body('name','Enter a Valid Name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password cant be blanked').exists(),
], async(req,res)=>{
    let success = false
    // in case of errors return bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password} = req.body;
    try {
        let user = await Employer.findOne({email});
        if(!user){
            return res.status(400).json({error : "Please try to login with correct credentials"})
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false
            return res.status(400).json({ success, error : "Please try to login with correct credentials"})
        }

        const data = {
            user:{
                id: user.id,
                role:user.role
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authtoken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error"); 
    }
})


// Route 3: Get loggedin Employer details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchemployer, async(req,res)=>{
try {
    userId = req.user.id;
    const user = await Employer.findById(userId).select("-password")
    // if(user.role !== 'employer'){
    //     return res.status(401).json({ error: "Access denied" });
    // }
    res.send(user)
} catch(error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error"); 
}})

module.exports = router 