I created a database name 'blogposts', with tables posts and authors.

(before running this comment the 20th code line in assignment.js)
URL to create db - localhost:3000/createdb 
(Un comment the 20th line and re-run the file)
URL to create Tables - localhost:3000/createtables 

ADD AUTHORS INTO THE DATABASE
*add your email in postRequest.js and password on line 10,11 & line 84 in assignment.js*
*Add real email ids for the email notification
URL - localhost:3000/author
    "name": "Michael Clark",
    "email": "mike95@yahoo.com"
}{

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
    "authorId": 1
}

{
    "title": "Post two",
    "description": "I am the second blog post!",
    "authorId": 1
}

{
    "title": "Post Third",
    "description": "I am the third blog post!",
    "authorId": 3
}

{
    "title": "Post fourth",
    "description": "I am the fourth blog post!",
    "authorId": 2
}

{
    "title": "Post fifth",
    "description": "I am the fifth blog post!",
    "authorId": 2
}


ADD AUTHORS INTO THE DATABASE
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

DELETE POST BY ID
URL - localhost:3000/post/update?num=1 (to delete first post)

UPDATE POSTS BY ID
URL - localhost:3000/post/update?num=2 (to update second post)
{
    "title": "Post one",
    "description": "Updated to first blog post!",
    "authorId": 1
}

FETCH ALL POSTS BY A AUTHOR BY ITS AUTHORID
URL - localhost:3000/posts/authorId?num=2 (to get all the posts from author id equals to 2)

