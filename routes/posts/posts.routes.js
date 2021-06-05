const router = require("express").Router();
const { Post } = require("../../models/posts/posts.model");

// create post
router.post("/", async(req, res) => {
    // const {} = req.body;
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});
// update post
router.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.updateOne({$set: req.body});
            res.status(200).json("Post has been updated");
        } else {
            res.status(403).json("You can only update your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
// delete posts
// like post 
// get a post 
// get timeline post

module.exports = router;