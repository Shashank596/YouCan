import { Problem} from "../models/problem.model.js";

export const deleteProblem = async(req , res) => {


    const {id}  = req.params;

    try {
        if(!id) {
            return res.status(400).json({message: " Invalid Problem"});
        }

        const deletedProblem = await Problem.findByIdAndDelete(id) ;

        if (!deletedProblem) {
            return res.status(400).send("Problem does not exist") ;
        }

        res.status(200).json({message: " Problem Deleted Succesfully"});
    }
    catch(err) {
         res.status(500).send("Error Occured", err);
    }
}