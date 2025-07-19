import express from "express";
import {userMiddleware} from "../middlewares/userMiddleware.js"
import { submitCode, runCode } from "../controllers/submissioncontroller.js";

const submitRouter = express.Router();

submitRouter.post("/submit/:id",userMiddleware, submitCode);
submitRouter.post("submit/:id", userMiddleware , runCode);