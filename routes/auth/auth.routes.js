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
    console.log(`${req.originalUrl}`);
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
        await User.findOne({ email: email })
        .then(async(user) => {
            if(user) {
                errors.push({msg: `User is already registered`})
                res.redirect("/api/auth/register");
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
                    // hashing password 
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    // new user instance 
                    const newUser =  new User({
                        name,
                        username,
                        email,
                        profileAvatar,
                        coverAvatar,
                        password: hashedPassword,
                    })
                    // saving user
                    const user = await newUser.save();
                    res.status(200).json(user)
                } catch(err) {
                    res.status(500).json(err);
                }
            }
        })
    }
})

/**
 * @param {*POST} login route
* @route {/api/user/login }
 */
router.post("/login", async(req, res) => {
    console.log(`Original URL - ${req.originalUrl}`);
    try {
        const errors = [];
        const user = await User.findOne({ email: req.body.email})
        !user && res.status(404).json("User not found")
        errors.push({msg: `${user.email} not found`});

        // password validity
        const validPassword =  await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(404).json("Wrong Password");
        errors.push({msg: `${user.password} not valid`});

        // ensuring user is valid
        if(user && validPassword) {
            res.status(200).json(`Logged in user ${user}`);
            console.log(`User is valid and logged in`);
        } else {
            res.status(404).json(`Validation process not passed, ${errors}`);
        }

        // after user is valid 
        // res.status(200).json(user);
        // console.log(`User logged in, ${user.email}`);
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports =  router;