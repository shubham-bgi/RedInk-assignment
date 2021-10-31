const express = require('express');
const mysql = require('mysql');
const app = express();

// Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'me',
    password : 'secret',
    database : 'blogposts'
})

//Connect
db.connect((err)=> {
    if(err) 
    throw err;
    else 
    console.log('Database Connected...')
});

app.listen('3000', () => {
    console.log('Server started on port 3000')
});
app.use(express.json());

// Create DB
app.get('/createdb', (req,res)=> {
    let sql = 'CREATE DATABASE blogposts';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created!')
    })
});

// Create tables inside DB
app.get('/createtables', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), description VARCHAR(255), authorId int, PRIMARY KEY (id))'
    let sql2 = 'CREATE TABLE authors(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), PRIMARY KEY (id))'
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
    })
    db.query(sql2, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Tables created...');
    })
});

//To save a new blog post
app.post('/post', (req, res) => {
    let post = req.body;
    let sql = 'INSERT INTO posts SET ?';
    //let sql2 = 
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post Added!');
    })

})

//Update a post by its id
app.put('/post/update', (req, res) => {
    let postId = req.query.num;
    let data = req.body;
    console.log(data);
    console.log(postId);
    let sql = `UPDATE posts SET title = '${data.title}', description = '${data.description}', authorId = ${data.authorId} WHERE id = ${postId}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated!');
    })
})

//Get all posts
app.get('/posts', (req, res) => {
    let sql = 'SELECT * from posts';
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

//Get all posts by author id
app.get('/posts/authorId', (req, res) => {
    let authorId = req.query.num;
    let sql = `SELECT * from posts WHERE authorId = ${authorId}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

//Delete post by id
app.delete('/post/delete', (req, res) => {
    let postId = req.query.num;
    let sql = `DELETE from posts WHERE id = ${postId}`;
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
    })
})

//To enter data into authors table
app.post('/author', (req, res) => {
    let authorDetails = req.body;
    let sql = 'INSERT INTO authors SET ?';
    let query = db.query(sql, authorDetails, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Author Added!');
    })
})