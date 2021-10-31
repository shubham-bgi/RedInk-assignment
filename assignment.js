const express = require('express');
const mysql = require('mysql');
const app = express();
const nodemailer = require('nodemailer');

//create transport 
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your_gmail_id',//Add your email id to test send email notification
        pass: 'your_gmail_password',//Password of that email id
    },
});

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

app.listen('3000', () => {
    console.log('Server started on port 3000')
});
app.use(express.json());

// Create DB
app.get('/createdb', (req,res)=> {
    let sql = 'CREATE DATABASE blog';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created!')
    })
});

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

//To save a new blog post
app.post('/post', (req, res) => {
    let post = req.body;
    let sql = `SELECT id from authors WHERE name LIKE '${post.authorName}'`;
    db.query(sql, (err,result) => {
        if(err) throw err;
        delete post['authorName'];
        post['authorId'] = result[0].id;
        let sql2 = 'INSERT INTO posts SET ?';
        let query = db.query(sql2, post, (err, result) => {
            if(err) throw err;
            else {
                console.log(result);
                let sql3 = `SELECT email from authors`;
                console.log()
                db.query(sql3,(err, result) => {
                    if(err) throw err;
                    else {
                        let mailingList = result.map( item => {
                            return item['email'];
                        }).toString();
                        const mailOptions = {
                            from: 'your_gmail_id',//need to replace with your email id
                            to: `${mailingList}`,
                            subject: 'New Blog Post',
                            html: 'A new blog post has just been added! Make sure to check it out.',
                        };
                        transport.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                            }
                            console.log(`Message sent: ${info.response}`);
                        });
                    }
                })
                res.send('Post Added!');
            }
        })
    })
})

//Update a post by its id
app.put('/post/update', (req, res) => {
    let postId = req.query.num;
    let post = req.body;
    let sql = `SELECT id from authors WHERE name LIKE '${post.authorName}'`;
    db.query(sql, (err,result) => {
        if(err) throw err;
        delete post['authorName'];
        post['authorId'] = Number(JSON.stringify(result).replace( /\D+/g, ''));
        let sql2 = `UPDATE posts SET title = '${post.title}', description = '${post.description}', authorId = ${post.authorId} WHERE id = ${postId}`;
        let query = db.query(sql2, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated!');
        })
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
    console.log(postId);
    let sql = `DELETE from posts WHERE id = ${postId}`;
    db.query(sql, (err,result) => {
        if(err) throw err;
        else {
            console.log(result);
            res.send('Post deleted!');
        }
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