const express = require('express');
const usersRouter = require('./routes/usersRouter');
require('./utils/connectDB')();

const app = express();

const PORT = process.env.PORT || 5000;

//* --- middleware --

app.use(express.json())




//*=== Routes ====

app.use('/api/v1/users', usersRouter)
// start the server for sure

app.listen(PORT, console.log(`server running on ${PORT}`))

