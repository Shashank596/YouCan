import { User } from "../models/user.model.js";
import { validate } from  "../utils/validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../config/redis.js";

export const registerUser = async(req, res) => {
  try {
    validate(req.body);
    const { firstName, emailId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
      
    req.body.role = 'user';
     

 
const user = await User.create({
  firstName,
  emailId,
  password: hashedPassword
});

    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId , role: 'user'},
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("User Registered Successfully.");
  } 
  catch (err) {
   res.status(400).json({ error: err.message });
  }
  };


export const loginUser = async(req,res) => {
  try {
    const {emailId , password} = req.body ;

    if (!emailId) {
      throw new Error("Invalid Credentials");

    }
    if (!password) {
      throw new Error (" Invalid Credentials");

    }

    const user = await User.findOne({emailId}).select('+password');
    if (!user){
      return res.status(404).json({message: " User not found "});
    }
 
         const isPasswordCorrect = await bcrypt.compare(password , user.password ) ;

         if (!isPasswordCorrect){
          return res.status(401).json({message: "Invalid email or password "});


         }

         const token =  jwt.sign({_id: user._id , emailId: emailId , role: user.role}, process.env.JWT_KEY, {expiresIn: 60*60});
         res.cookie ('token', token,{maxAge: 60*60*1000});
          res.status(200).send("Logged In Successfully")
 
    }
    catch(err) {
     res.status(400).json({ error: err.message });
    }
}

//logout feature

export const logoutUser = async(req,res) => {
  try {
     
    const {token} = req.cookies;
    const payload = jwt.decode(token);
    
    await client.set(`token: ${token}`,"blocked");
    await client.expireAt(`token : ${token}`, payload.exp);

    res.cookie("token", null ,{expires: new Date(Date.now())} );
    res.status(200).send("Logged out succesfully");


  } catch(err) {
      res.status(503).json({ error: err.message });
  }
}