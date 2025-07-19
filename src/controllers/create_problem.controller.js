import { Problem } from "../models/problem.model.js";
import { getLanguageById } from "../utils/language.js";
import { submitBatch , submitToken } from "../utils/submission.js";



 export const createProblem = async(req, res) => {

     const { title , description , difficulty , tags, visibleTestCases , hiddenTestCases , startCode , referenceSolution , problemCreator} = req.body;


     try {
     
        for ( const {language , completeCode } of referenceSolution){
              
             const languageId = getLanguageById(language);

             const submissions = visibleTestCases.map((testcase)=>({
                 source_code: completeCode,
                 language_id : languageId,
                 stdin : testcase.input,
                 expected_output : testcase.output
             }));

             const submitResult = await submitBatch(submissions);

            const resultToken = submitResult.map((value) => value.token);
             
              console.log(" Submissions sent:", submissions);
               console.log(" submitResult:", submitResult);


             
             // it will create a array of tokens : [token1 , token2 , token3]

             const testResult = await submitToken(resultToken);
             console.log(resultToken);

             for ( const test of testResult) {

                if (test.status_id != 3){
                   return  res.status(400).send("Error Occured ");
                }

             }
             





        }

        // now after all the languages give correct output and are checked 
        // we will save this refrence solution in database...
 
         await Problem.create({
            ...req.body,
            problemCreator: req.result._id
         });

         res.status(201).send("Problem Saved Succesfully");


    } catch(err) {
         res.status(400).json({ error: err.message });
    }
 }