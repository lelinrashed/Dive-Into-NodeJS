const { getAllPost, singlePost, createNewPost, updatePost, deletePost } = require('./postController')

const router = require('express').Router()

router.get('/', getAllPost)

router.get('/:postId', singlePost)

router.post('/', createNewPost)

router.put('/:postId', updatePost)

router.delete('/:postId', deletePost)

module.exports = router
