const router = require("express").Router();

router.get("/register", (req, res) => {
    // Destructuring form request
    const {name, username, email, password, confirmPassword} = req.body;
    
    // errors
    const errors = [];

    // validating form
    if(!name || !username || !email || !password){
        errors.push({msg: "Sorry all fields are required"});
    }

    // regex
    // const regex = ``
    // RegExp
    // const alid_name = `/\^a-z/\^0-9/`;
    const valid_name = new RegExp(`/\^[A-Za-z]/\/\w{5, 29}$/`)

    // confirming password 
    if(password !== confirmPassword && password.length < 8 && !password.includes(valid_name)) {
        errors.push({msg: "Sorry password incorrect"});
    }

    if(errors.length > 0) {
        res.json({msg: `${errors, req.body}`})
    } else {
        // validation passed
        
    }
})

module.exports =  router;