const router = require('express').Router()
const postController = require("../controllers/postController")
const auth = require('../middleware/auth')

router.post('/posts' , auth , postController.createPost)

router.get('/posts' , auth , postController.getPosts)

router.get('/post/:id', auth , postController.getPost)

router.delete('/post/:id', auth , postController.deletePost)

router.patch('/post/:id' , auth , postController.updatePost)

router.patch('/post/:id/like' , auth , postController.likePost)

router.patch('/post/:id/unlike' , auth , postController.unLikePost)

router.get('/user_posts/:id' , auth , postController.getUserPosts)

router.get('/post_discover' , auth , postController.getPostsDiscovery)

router.patch('/savePost/:id' , auth , postController.savePost)

router.patch('/unSavePost/:id' , auth , postController.unSavePost)

router.get('/getSavePosts' , auth , postController.getSavePosts)











module.exports = router