import dotenv from "dotenv" 
import app from "./App.js"
import connectDB from "./config/dB.js"
import client from "./config/redis.js"



dotenv.config({
    path : './env' 
})

const initializeConnection = async() => {
    

    try {

        await Promise.all ([connectDB(), client.connect()]);
        console.log("DB connected ");

         app.listen(process.env.PORT|| 8001 , ()=>{
         console.log(`server is running at port : ${process.env.PORT} `) ;
    })
    } 
    catch(err) {
       console.log("Error", err);
    }
}
initializeConnection();


// connectDB()
// .then( () => {
//     app.on("error", (error) => {
//        console.log("ERROR during listening on app: ", error) 
//     })

//      app.listen(process.env.PORT|| 8001 , ()=>{
//         console.log(`server is running at port : ${process.env.PORT} `) ;
//     })
// })
// .catch((err) => {
//    console.log("MONGODB connection failed",err) ;
// })


