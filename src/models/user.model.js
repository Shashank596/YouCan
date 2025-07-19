import mongoose from "mongoose" ;
const userSchema = new mongoose.Schema({

firstName : {
    type : String,
    required : true,
    minLength : 3,
    maxLength : 20,
},

lastName : {
    type : String,
    minLength : 3,
    maxLength : 20,

},
emailId : {
    type  : String ,
    required :  true,
    unique : true,
    trim : true,
    lowercase: true,

},

age: {
    type : Number,
    min : 10,
    max: 80,
},

role : {
    type  : String,
    enum: ['user', 'admin'] ,
    default : 'user'
},

problemSolved: {
    type : [{
        type : Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    unique: true 

},

password : {
    type :  String,
    required : true,
    select : false 
}

},{timestamps: true });





export const User = mongoose.model("User", userSchema);

