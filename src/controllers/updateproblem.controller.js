import { Problem } from "../models/problem.model.js"

export const updateProblem = async(req , res ) => {

    const {id} = req.params;
    const { title , description , difficulty , tags, visibleTestCases , hiddenTestCases , startCode , refrenceSolution , problemCreator} = req.body;
    try {
        if(!id) {

           return  res.status(400).send("Invalid Id !!");
           
        }
      const dsaProb = Problem.findById(id);
      
            if(!dsaProb) {
                return res.status(400).send("Problem does not exist")
            }
        
      
         for ( const {language , completeCode } of refrenceSolution){
                      
                     const languageId = getLanguageById(language);
        
                     const submissions = visibleTestCases.map((testcase)=>({
                         source_code: completeCode,
                         language_id : languageId,
                         stdin : testcase.input,
                         expected_output : testcase.output
                     }));
        
                     const submitResult = await submitBatch(submissions);
        
                     const resultToken = submitResult.map((value) => {
                        value.token;
                     });
                     
                     // it will create a array of tokens : [token1 , token2 , token3]
        
                     const testResult = await submitToken(resultToken);
        
                     for ( const test of testResult) {
        
                        if (test.status_id != 3){
                           return  res.status(400).send("Error Occured ");
                        }
        
                     }
                     
        
        
        
        
        
                }


           const newProblem =  Problem.findByIdAndUpdate(id , {...req.body}, {runValidators: true, new: true});
              res.status(200).send(newProblem);

            
    } catch(err) 
    
    {
       res.status(200).send("Error Occured in updation", err) ;
    }
} 