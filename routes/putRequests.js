module.exports = (app,db) => {
    //Update a post by its id
    app.put('/post/:id', (req, res) => {
        let postId = req.params.id;
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
}

