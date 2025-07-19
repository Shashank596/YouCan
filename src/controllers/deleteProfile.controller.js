import { User} from "../models/user.model";
import { Submission} from "../models/submission.model";

export const deleteProfile = async( req , res) => {
    try {
        const userId = req.result._id;
        
        //database delete

           await User.findByIdAndDelete(userId);

           // Saare Submission bhi delete kardo 

           await Submission.deleteMany(userId);

           res.status(200).send("deleted Succesffully");
    } catch(err) {
         res.status(500).send("Internal server Error", err);
    }
}