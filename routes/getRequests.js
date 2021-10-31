//Get all posts or by authorId
module.exports = (app,db) => {

    app.get('/posts', (req, res) => {
        let sql = 'SELECT * from posts';
        db.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        })
    })

    //search all by author id
    app.get('/posts/:authorId', (req, res) => {
        let authorId = req.params.authorId;
        let sql = `SELECT * from posts WHERE authorId = ${authorId}`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        })
    })

    // Create tables inside DB
    app.get('/createtables', (req, res) => {
        let sql2 = 'CREATE TABLE authors(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), PRIMARY KEY (id))'
        db.query(sql2, (err, result) => {
            if(err) throw err;
            console.log(result);
        })
        let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), description VARCHAR(255), authorId int, PRIMARY KEY (id), FOREIGN KEY (authorId) REFERENCES authors(id))'
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send('Tables created...');
        })
    });
}

  
