const router = require("express").Router();
const { Post } = require("../../models/posts/posts.model");

// create post
router.post("/", async(req, res) => {
    // const {} = req.body;
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err);
    }
}) 
// update post
// delete posts
// like post 
// get a post 
// get timeline post

module.exports = router;