const express = require('express');
const cookieParser = require("cookie-parser")
require("dotenv").config()
const usersRouter = require('./routes/usersRouter');
const { errorHandler } = require('./middlewares/errorMiddleware');
require('./utils/connectDB')();

errorHandler

const app = express();

const PORT = process.env.PORT || 5000;

//* --- middleware --

app.use(express.json())
app.use(cookieParser()) //* pass cooke automatically




//*=== Routes ====

app.use('/api/v1/users', usersRouter)
// -- middleware 

app.use(errorHandler)
// start the server for sure

app.listen(PORT, console.log(`server running on ${PORT}`))

