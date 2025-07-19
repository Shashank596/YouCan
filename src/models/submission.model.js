import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema( {
  
    userId : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },

    problemId: {
        type : Schema.Types.ObjectId,
        ref: 'Problem',
        required: true,
    },

    code: {
        type: String,
        required: true,
    },
    language: {
        type : String,
        required: true,
        enum: ['Javascript', 'c++', 'java', 'Ruby', 'Swift', 'python']
    },
    status : {
        type: String,
        required: true,
        enum: ['Pending', 'Accepted', 'Wrong', 'Error'],

    },

    runtime: {
        type: Number, // Milliseconds
        default: 0
    },
    memory: {
        type: Number,
        defalt: 0
    },
    errorMessage: {
        type: String,
        default: ""
    },
    testCasesPassed: {
        type: Number,
        default: 0,
        required: true
    },
    testCaseTotal: {
        type: Number,
        default: 0,
        required: true,

    },


}, {
    timestamps : true

});

submissionSchema.index({userId:1 , problemId: 1});

export const Submission = mongoose.model("Submission", submissionSchema);