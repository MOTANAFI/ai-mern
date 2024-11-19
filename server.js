const express = require('express');
const usersRouter = require('./routes/usersRouter');

const app = express();

const PORT = process.env.PORT || 5000;




//*=== Routes ====

app.use('/api/v1/users', usersRouter)
// start the server for sure

app.listen(PORT, console.log(`server running on ${PORT}`))

