exports.getAllPost = (req, res) => {
    let { category, page, filter } = req.query
    console.log(page)
    res.send('Render all posts')
}


exports.singlePost = (req, res) => {
    res.send('I am post ' + req.params.postId)
}


exports.createNewPost = (req, res) => {
    res.send('Create new post')
}


exports.updatePost = (req, res) => {
    res.send('Update your existing post ' + req.params.postId)
}


exports.deletePost = (req, res) => {
    res.send('Delete your existing post ' + req.params.postId)
}
