import { Problem } from "../models/problem.model.js";

export const getProblemById = async (req , res) => {
    const {id} = req.params;

    try {
    if (!id) {
        return res.status(400).json({message : " ID is Missing "});
        

    }

    const getProblem = await Problem.findById(id).select('_id title  description diffficulty tags visibleTestCases startCode referenceSolution');

    if (!getProblem) {
        return res.status(404).json({message: " This Problem is Missing "});

    }

    res.status(200).send(getProblem);
}catch(err) {
  res.status(500).send("Error", err);
    }

}


export const getAllProblem  = async(req , res) => {
    try {

        // const page = 2
        // const limit =  10;
        // const skip = (page-1)*limit;

    const getProblem = await Problem.find().skip(20).limit(10).select('_id title difficulty tags'); 
                                                        
    if (getProblem.length === 0) {
        return res.status(400).json({message : " Problem is missing "});
    }

    res.status(200).send(getProblem);

} catch(err) {

}

}
