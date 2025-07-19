import express from "express"
import cookieParser from "cookie-parser"
import router from "./routes/user.routes.js"
import probRouter from "./routes/problem.routes.js";
import submitRouter from "./routes/submit.route.js";

const app = express() ;



app.use(express.json({limit : "10kb"})) 

app.use(cookieParser()) 
app.use('/user', router );
app.use('/problem', probRouter);
app.use('/submission', submitRouter) ;




export default app;