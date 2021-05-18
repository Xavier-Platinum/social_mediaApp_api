const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user/User.model");

// updating user 
router.put("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.user.isAdmin) {
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
// get user 
// follow a user 
// unfollow a user

router.get("/", (req, res) => {
    res.json("Hello users routes");
})

module.exports =  router;