import { Problem } from "../models/problem.model.js";
import { Submission} from "../models/submission.model.js";
import { getLanguageById } from "../utils/language.js";
import { submitBatch, submitToken} from "../utils/submission.js";

export const submitCode = async(req, res)=> {

     const userId = req.result._id;
     const problemId = req.params.id;

     const{code , language} = req.body

    try {

        if (!userId || !code || !problemId || !language){
            return res.status(400).send("Some field is missing");
        }

             //FETCH THE PROBLEM FROM DATABASE 

        const problem = await Problem.findById(problemId);

            // I will get hidden test cases 

            /* FE sends code
               BE saves the code with pending status in  DB before sending it to judge0
               If i directly send code to judge0 and if it might crash then there will be no 
               history of code which was sent by the FE.
               Saving code to DB with status pending -> calling judge0 -> updatingDB 
            */
        
             const submittedResult = await Submission.create({
                 userId,
                 problemId,
                 code,
                 language,
                 testCasesPassed : 0,
                 status: 'pending',
                 testCasesTotal : problem.hiddenTestCases.length
             });

             // now submit code to judge0
              const languageId = getLanguageById(language);

              const submissions = Problem.hiddenTestCases.map((testcase)=>({
                 source_code: completeCode,
                 language_id : languageId,
                 stdin : testcase.input,
                 expected_output : testcase.output

             }));
             const submitResult = await submitBatch(submissions);

             const resultToken = submitResult.map((value) => value.token);
             
              console.log(" Submissions sent:", submissions);
               console.log(" submitResult:", submitResult);
    
                const testResult = await submitToken(resultToken);
                            //console.log(testResult);

               // Update submittedResult

                  let testCasesPassed = 0;
                  let runtime = 0;
                  let memory = 0;
                  let status = "accepted";
                  let errorMessage = null;


               for (const test of testResult) {
                     if(test.status_id == 3) {
                      testCasesPassed++;
                       runtime = runtime + parseFloat(test.time);
                       memory = Math.max(memory , test.memory);

                     } else {
                        if(test.status_id == 4){
                            status = "error"
                            errorMessage = test.stderr;

                        }
                        else {
                            status = 'wrong';
                            errorMessage = test.stderr;
                        }
                     }

                        
               }
             
    submittedResult.status = status;
    submittedResult.testCasesPassed = testCasesPassed;
    submittedResult.runtime = runtime;
    submittedResult.memory = memory;
    submittedResult.errorMessage = errorMessage;

     await submittedResult.save();

       res.status(201).send(submittedResult);

       // Inserting problemid to userSchema ProblemSolved -> If not present. 

               
           if (!req.result.problemSolved.includes(problemId) ) {
            req.result.problemSolved.push(problemId);
            await req.result.save();
           } 


    } catch(err) {
        res.status(500).send("Internal server error");

    }
}

export const runCode = async(req, res)=> {

     const userId = req.result._id;
     const problemId = req.params.id;

     const{code , language} = req.body

    try {

        if (!userId || !code || !problemId || !language){
            return res.status(400).send("Some field is missing");
        }

             //FETCH THE PROBLEM FROM DATABASE 

        const problem = await Problem.findById(problemId);

        
              const languageId = getLanguageById(language);

              const submissions = Problem.visibleTestCases.map((testcase)=>({
                 source_code: completeCode,
                 language_id : languageId,
                 stdin : testcase.input,
                 expected_output : testcase.output

             }));
             const submitResult = await submitBatch(submissions);

             const resultToken = submitResult.map((value) => value.token);
             
              console.log(" Submissions sent:", submissions);
               console.log(" submitResult:", submitResult);
    
                const testResult = await submitToken(resultToken);
                            //console.log(testResult);

   
 

       res.status(201).send(testResult);

      


    } catch(err) {
        res.status(500).send("Internal server error");

    }
}