const express = require('express');
const User = require('../Models/User');
const app = express();
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Signature = 'Tushar'
app.use(express.json());
const fetchuser = require('../middleware/fetchuser');
const nodemailer = require('nodemailer')
// To Create A user
router.post('/createuser', [
  body('email', 'Please enter a valid email').isEmail(),
  body('pass', 'Password length should be minimum 5 letters').isLength({ min: 5 }),
  // body('phone').isMobilePhone,
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json({ errors: errors.array() });
    console.log({ errors })
  }

  const saltRounds = await bcrypt.genSalt(10);
  let secPass = await bcrypt.hash(req.body.pass, saltRounds)

  try {
    await User.create({
      salutation: req.body.salutation,
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      designation: req.body.designation,
      department: req.body.department,
      email: req.body.email,
      pass: secPass,
      phone: req.body.phone,
      org_name: req.body.org_name,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      zipCode: req.body.zipCode,
      state: req.body.state,
      username: req.body.username,
      admin: false
    })

    // adminpass

    res.json({ success: true })
    console.log("Account Created")


  } catch (error) {
    console.log(error)
    res.json({ success: false })
  }

});

// Login the user
router.post('/login', [
    body('pass', 'Password length should be minimum 5 letters').isLength({ min: 5 }),
  ], async (req, res) => {
  
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      console.log(errors)
    }
    const { username, pass } = req.body
    try {
  
      const user = await User.findOne({ username });
    //   console.log("I am user" , user);
      if (!user) {
        return res.status(400).json({ errors: "You don't have an account" });
      }
  
      if (!user.pass) {
        return res.status(400).json({ errors: "Password not found" });
      }
  
      const pwdCompare = await bcrypt.compare(pass, user.pass)
      if (!pwdCompare) {
        console.log(pwdCompare)
        return res.status(402).json({ errors: "Incorrect Password" })
      }
      
      const data = {
          userr: {
              id: user._id
            }
        }
        
        // console.log(data);
        
        const authToken = jwt.sign(data, Signature)
        
        if(user.admin)
        {
          const adminId = user._id;
          return res.json({ success: true, authToken: authToken,adminId: adminId })
        }
    
      res.json({ success: true, authToken: authToken })
      console.log("Logged in SuccessFully")
  
  
    } catch (error) {
      console.log(error)
      res.json({ success: false })
    }
  
  });
  

  
router.post('/sendLink', async (req, res) => {
  const email = req.body.email;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter your email" });
  }
  else {

    try {
      const ans = await User.findOne({ "email": email });
      if (ans) {
        const token = jwt.sign({ _id: ans.id }, Signature, {
          expiresIn: '300s'
        });
        console.log(token);
        res.status(200).json(ans);

        const setUserToken = await User.findByIdAndUpdate({ _id: ans.id }, { verify_token: token }, { new: true })


        // Set up a nodemailer SMTP transporter with your email credentials
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 25,
          secure: false,
          auth: {
            user: 'tg21014@gmail.com',
            pass: 'dmtulilbljlvwqbo'
          }
        });

        const message = {
          from: 'CDAC',
          to: email,
          subject: 'Password Reset Link',
          text: `Click the following link to reset your password: https://zomaggy-383610.web.app/Resetpassword/${ans.id}/${token}`,
          html: `<body>
          <div class='parentpass'>
          <div class='passcont' style="padding: 10px 30px 10px 30px;background: beige;">
          <p>Dear ${ans.name} <br>
          We just received a request to reset your password. This link will take you to the password reset page, and you can proceed from there.
          If you did not attempt to reset your password, please ignore this email. No changes will be made to your login information.
          Click the following link to reset your password:</p>
          <a href="https://zomaggy-383610.web.app/Resetpassword/${ans.id}/${token}"> Reset Password</a><br> 
          <b><p>Note: This link is valid for only 5 minutes</p></b></body> <br></div>
          </div>
          Thank You`
        };


        // Send the email with nodemailer
        transporter.sendMail(message, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending email' });
          } else {
            console.log('Email sent: ', info.response);
            res.status(200).json(ans);
          }
        });

        console.log(setUserToken);


      }
      else {
        res.status(401).send({ "message": "User not found", "success": false });
      }

    } catch (error) {
      console.error(error);
    }
  }
})

// Route to change password
router.put('/changePass/:id/:token', async (req, res) => {
  try {
    const { id, token } = req.params;

    // Check for valid user and token
    const validUser = await User.findOne({ _id: id, verify_token: token });

    if (!validUser) {
      res.status(401).send({ message: 'Invalid User or Token' });
      return;
    }

    // Verify token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, Signature);
    } catch (error) {
      res.status(401).send({ message: 'Authentication failed!' });
      return;
    }

    const { pass } = req.body;
    const saltRounds = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(pass, saltRounds);

    const response = await User.findByIdAndUpdate(id, { pass: secPass });

    if (response) {
      res.status(200).send({ message: 'Password Changed successfully' });
      console.log('Password Changed Successfully');
    } else {
      res.status(500).send({ message: 'Error while changing password' });
      console.log('Problem while changing pass');
    }
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;