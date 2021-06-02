const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user/User.model");

// updating user 
router.put("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err) {
                return res.status(500).json(err)
            }
            try {
                const user = User.findByIdAndUpdate(req.params.id, {
                    $set: req.body, // setting all requests in the body
                })
                res.status(200).json("Account Updated Successfully");
            }catch(err) {
                res.status(500).json(err);
            }
        }
    } else {
        res.status(403).json("Permission to update not granted");
    }
})
// delete user 
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account Deleted Successfully");
        }catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Permission to delete not granted");
    }
})
// get user 
router.get("/:id", async(req, res) => {
    try {
        const user = User.findById(req.params.id);
        const {password, updatedAt, ...others} = user._doc;
        res.status(200).json(others);
    } catch(err) {
        res.status(500).json(err);
    }
});
// follow a user 
router.put("/:id/follow", async(req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.finById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: {followers: req.body.userId}});
                await currentUser.updateOne({ $push: {followings: req.body.userId}});
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You are already following")
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("Sorry you can't follow yourself");
    }
})
// unfollow a user

router.get("/", (req, res) => {
    res.json("Hello users routes");
})

module.exports =  router;