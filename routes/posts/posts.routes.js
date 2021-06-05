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
});
// delete posts
router.delete("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post has been deleted");
        } else {
            res.status(403).json("You can only delete your post");
        }
    } catch (err) {
        res.status(500).json(err)
    }
});
// like post // dislike a post
router.put("/:id/like", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: {likes: req.body.userId} })
            res.status(200).json("Post has been liked");
        } else {
            await post.updateOne({ $pull: {likes: req.body.userId} });
            res.status(200).json("Post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
// get a post 

// get timeline post

module.exports = router;