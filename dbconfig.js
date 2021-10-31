const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'me',
    password : 'secret',
    database : 'blog'
})

//Connect
db.connect((err)=> {
    if(err) 
    throw err;
    else 
    console.log('Database Connected...')
});

module.exports = {
    db
}