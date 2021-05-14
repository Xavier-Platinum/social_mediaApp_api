const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    profileAvatar: {
        type: String,
        default: ""
    },
    coverAvatar: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
module.exports = {User: mongoose.model("User", userSchema)};