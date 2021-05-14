const router = require("express").Router();

router.get("/", (req, res) => {
    res.json("Hello auth routes");
})

module.exports =  router;