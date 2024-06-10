const express = require('express');
const postController = require('../Controllers/posts')

const router = express.Router();

router.get('/posts', postController.getPosts); //retrive all posts

router.get('/posts/:id', postController.getPostById); //retrive single post

router.post('/posts', postController.createPost); //create a new post

router.put('/posts/:id', postController.editPost); //upadate an exsisting post

router.delete ('/posts/:id', postController.deletePost); //delete an existing post

// Commenting routes

router.post("/comments/:postId", postController.postComment);
router.put("/comments/:id", postController.editComment);
router.delete('/comments/:id', postController.deleteComment);


module.exports = router;