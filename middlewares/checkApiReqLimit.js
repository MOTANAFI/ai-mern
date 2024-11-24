const asyncHandler = require('express-async-handler')
const User = require('../models/User')


const checkApiReqLimit = asyncHandler(async(req, res, next) => {
    if(!req.user) {
        return res.status(401).json({
            message: "Not Authorized"
        })
    }
    //* find user
    const user = await User.findById(req?.user?.id);
    if(!user) res.status(404).json({message: "User not Found"})
    let requestLimit = 0;
//*check if the user is on trail period
if(user?.isTrialActive){
    requestLimit = user?.monthlyRequestCount
}
// check if the user has exceeded his/her monthly request or not
if(user?.apiRequestCount >= requestLimit) {
    throw new Error("API Request limit reached please subscribe to a plan")
}
    next()
})

module.exports = checkApiReqLimit