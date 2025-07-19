import express from "express" ;
import { createProblem } from "../controllers/create_problem.controller.js";
import {adminMiddleware} from "../middlewares/adminMiddleware.js";
import {userMiddleware} from "../middlewares/userMiddleware.js";
import { updateProblem } from "../controllers/updateproblem.controller.js";
import { deleteProblem } from "../controllers/deleteproblem.controller.js";
import { getProblemById, getAllProblem } from "../controllers/getprobid.controller.js";
import { solvedAllProblemByUser , submittedProblem } from "../controllers/solvedAllProb.controller.js";


const probRouter = express.Router();



// Admin access

// Create

probRouter.post("/create", adminMiddleware, createProblem);

// //Update a problem 

probRouter.put("/update/:id",adminMiddleware, updateProblem);

// // Delete a problem

probRouter.delete("/delete/:id", adminMiddleware, deleteProblem);



// // No admin access 


// //Fetch A problem 

 probRouter.get("ProblemById/:id", userMiddleware, getProblemById);

// // // Fetch All Problems

 probRouter.get("/AllProblem/:id", userMiddleware , getAllProblem);

  //Solved Problem

   probRouter.get("/ProblemSolvedByUser", userMiddleware, solvedAllProblemByUser);

   probRouter.get("/submittedProblem", userMiddleware,  submittedProblem );

 export default probRouter ; 