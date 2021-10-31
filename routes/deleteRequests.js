module.exports = (app,db) => {
    //Delete post by id
    app.delete('/post/:id', (req, res) => {
        let postId = req.params.id;
        let sql = `DELETE from posts WHERE id = ${postId}`;
        db.query(sql, (err,result) => {
            if(err) throw err;
            else {
                console.log(result);
                res.send('Post deleted!');
            }
        })
    })
}
