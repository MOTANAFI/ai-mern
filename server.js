const express = require('express')

const app = express();

const PORT = process.env.PORT || 5000;





// start the server for sure

app.listen(PORT, console.log(`server running on ${PORT}`))

