const mongoose = require("mongoose")

//-- mern-ai-2015-1

const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb+srv://twaha2030:mern-ai-2015-1@mern-ai.tepj1.mongodb.net/?retryWrites=true&w=majority&appName=mern-ai');
        console.log(`Mongodb connected ${conn.connection.host}`)

    }catch (error){
        console.error(`Error connectiong to MongoDB ${error.message}`);
        process.exit(1)
    }
}

module.exports = connectDB