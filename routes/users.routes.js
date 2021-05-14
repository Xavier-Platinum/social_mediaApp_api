const router = require("express").Router();

router.get("/", (req, res) => {
    res.json("Hello users routes");
})

module.exports =  router;