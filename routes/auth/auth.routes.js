const router = require("express").Router();
const isValidUsername = require("../../helpers/regex/regex.helper");
const { User } = require("../../models/user/User.model");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

/**
 * @param {*POST} registration route
* @route {/api/user/register }
 */
router.post("/register", async(req, res) => {
    // Destructuring form request
    const {name, username, email, password, confirmPassword} = req.body;
    
    // errors
    const errors = [];

    // validating form
    if(!name || !username || !email || !password){
        errors.push({msg: "Sorry all fields are required"});
    }
    
    // const valid_name = new RegExp(`/\^[A-Za-z]/\/\w{5, 29}$/`);

    // if(!name.includes(valid_name(name))){
    //     errors.push({msg: "Not a valid username"});
    // } 

    // regex
    // const regex = ``
    // RegExp
    // const alid_name = `/\^a-z/\^0-9/`;

    // confirming password 
    if(password !== confirmPassword && password.length < 8) {
        errors.push({msg: "Sorry password incorrect"});
    }

    if(errors.length > 0) {
        res.status(200).json({msg: `${errors, req.body}`})
    } else {
        // validation passed
        await User.findOne({ username: username })
        .then(async(user) => {
            if(user) {
                errors.push({msg: `User is already registered`})
                res.redirect("/api/user/register");
                res.status(400).json({msg: `User is already registered`});
            } else {
                const profileAvatar = gravatar.url(req.body.email, {
                    protocol: "https", // secure transport
                    s: "200", //size
                    r: "pg", //rating
                    d: "mm" //default
                })
                const coverAvatar = gravatar.url(req.body.email, {
                    protocol: "https", // secure transport
                    s: "200", //size
                    r: "pg", //rating
                    d: "mm" //default
                })
                try {
                    const salt = await bcryt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    const newUser =  new User({
                        name,
                        username,
                        email,
                        hashedPassword,
                        profileAvatar,
                        coverAvatar
                    })
                    const user = await newUser.save();
                    res.status(200).json(user)
                } catch(err) {
                    console.log(err)
                }
            }
        })
    }
})

module.exports =  router;