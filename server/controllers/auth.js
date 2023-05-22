import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken" //for user authorization
import User from "../models/User.js"  //we haven't created this folder yet

export const register = async (req, res) => { //controller for the .post type route 
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,
      } = req.body; //destructuring
  
      const salt = await bcrypt.genSalt(); //this salt has to be used 
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

/* LOGGING IN */
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      //important step
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); 
       //once a new login is there , if the login detials are correct then a token is created using a secret key and the mongoDB id corresponding to that user 

      //so that the response doesn't carry the password field
      delete user.password;

      res.status(200).json({ token, user }); //we have to send the token in response 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
