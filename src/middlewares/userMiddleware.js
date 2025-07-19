import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import client from "../config/redis.js";

export const userMiddleware = async(req,res,next) => {
    try{
        const {token} = req.cookies;

        if(!token) {
            throw new Error("Token is not present");
        }
      const payload = jwt.verify(token,process.env.JWT_KEY);
         
      const {_id} = payload;

      if (!_id){
        throw new Error("Invalid Token");
      }

      const result = await User.findById(_id);

      if (!result) {
        throw new Error ("User Doesn't Exist ");

      }

      const isBlocked = await client.exists(`token : ${token}`);

      if (isBlocked)
      {
        throw new Error("Invalid Token ");
      }
       req.result = result;

       next();
    } 

    // Redis ke blocklist main toh token present nahi hai 
    catch (err) {
         res.status(400).json({ error: err.message });
    }
}