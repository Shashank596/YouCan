import express from "express" ;

const router = express.Router();

import { registerUser } from "../controllers/user.controller.js";
import { loginUser} from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
import { adminMiddleware} from "../middlewares/adminMiddleware.js";
import { adminRegister } from "../controllers/admin.controller.js";
import { deleteProfile} from "../controllers/deleteProfile.controller.js";
// register/signup

router.post('/register', registerUser );

//login

router.post('/login', loginUser);



//logout 

router.post('/logout', userMiddleware, logoutUser);

//profile
  
router.post('/delete', userMiddleware, deleteProfile);

//router.post('/profile', userProfile)

router.post('/admin/registerUser', adminMiddleware , adminRegister);


export default router ;


