I created a database name 'blog', with tables posts and authors.

URL to create Tables - localhost:3000/createtables 

ADD AUTHORS INTO THE DATABASE
*add email and passwords in postRequest.js*
*Add real email ids for the email notification*
URL - localhost:3000/author
{
    "name": "Michael Clark",
    "email": "mike95@yahoo.com"
}
{
    "name": "Jaqulin Goodman",
    "email": "jaqulin_goodman@gmail.com"
}
{
    "name": "Shubhash Kumar Desai",
    "email": "author_Kdesai@gmai.com"
}

ADD POSTS INTO THE DATABASE
URL - localhost:3000/post
{
    "title": "Post one",
    "description": "I am the first blog post!",
    "authorName": "Michael Clark"
}

{
    "title": "Post two",
    "description": "I am the second blog post!",
    "authorName": "Michael Clark"
}

{
    "title": "Post Third",
    "description": "I am the third blog post!",
    "authorName": "Shubhash Kumar Desai"
}

{
    "title": "Post fourth",
    "description": "I am the fourth blog post!",
    "authorName": "Jaqulin Goodman"
}

{
    "title": "Post fifth",
    "description": "I am the fifth blog post!",
    "authorName": "Jaqulin Goodman"
}

DELETE POST BY ID
URL - localhost:3000/post/1 (to delete first post)

UPDATE POSTS BY ID
URL - localhost:3000/post/2 (to update second post)
{
    "title": "Post one",
    "description": "Updated to first blog post!",
    "authorName": "Michael Clark"
}

FETCH ALL POSTS BY A AUTHOR BY ITS AUTHORID
URL - localhost:3000/posts/2 (to get all the posts from author id equals to 2)