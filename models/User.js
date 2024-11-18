const mongoose = require('mongoose');


//*Schema 

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    trialActive: {
        type: Boolean,
        default: Date,
    },
    trialExpires: {
        type: Date
    },
    subscription: {
        type: String,
        enum:['Trial', 'Free', 'Base', 'Premium']
    },
    apiRequsetCount:{
        type: Number,
        default:0
    },
    monthlyRequestCount: {
        type: Number,
        default: 0
    },
    nextBillingDate: Date,
    payments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "payment"
        }
    ],
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "History"
            
        }
    ]
},
{
    timestamps: true
}
)

//! Compile to form the model

const User = mongoose.mongo('User', userSchema)