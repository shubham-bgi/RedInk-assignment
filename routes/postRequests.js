module.exports = (app,db) => {
    const nodemailer = require('nodemailer');

    //create transport 
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your_gmail_id',//Add your email id to test send email notification
            pass: 'your_gmail_pass',//Password of that email id
        },
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
}