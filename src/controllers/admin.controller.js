import { User } from "../models/user.model.js";
import { validate } from  "../utils/validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const adminRegister = async(req, res) => {
  try {
    
    validate(req.body);
    const { firstName, emailId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
      
    req.body.role = 'admin';
     

    const user = await User.create(req.body);

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