import { User } from "../models/user.model.js";
import { Submission} from "../models/submission.model.js";

export const solvedAllProblemByUser = async(req , res) => {


    try {
    //    const count  = req.result.problemSolved.length;
    //    res.status(200).send(count);

    const userId = req.result;
    const user = await User.findById(userId).populate({
        path: "problemSolved",
        select: "id , title , difficulty, tags"
    });

    res.status(200).send(user.problemSolved);
     
    } 
     catch(err) {
         res.status(500).send(" Internal server Error");
         
     }

     
}

export const submittedProblem = async(req , res) => {
    try {
        const userid = req.result._id;
        const problemId = req.params.pid;
        const ans = await Submission.find({userId , problemId});

        if (ans.length == 0)
            res.status(200).send(" No submission is present ");
        res.status(200).send(ans);
        
    } catch(err) {
         res.status(500).send("Internal Server Error ");
    }
}