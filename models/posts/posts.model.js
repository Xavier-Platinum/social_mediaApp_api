const mongoose =  require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema ({
    userId: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: String,

    },
    likes: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = {Post: mongoose.model("Post", postSchema)};