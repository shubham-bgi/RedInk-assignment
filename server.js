const express = require('express');
const app = express();
const db = require('./dbconfig').db;
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server started on : http://localhost:${PORT}`);
});
app.use(express.json());

//Import Routes
require('./routes/getRequests')(app,db);
require('./routes/postRequests')(app,db);
require('./routes/putRequests')(app,db);
require('./routes/deleteRequests')(app,db);