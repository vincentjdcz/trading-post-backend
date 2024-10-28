const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    cardApiId: {
        type: String,
        required: true,
    },

    cardFrontPicture: {
        type: String,
        required: true,
    },

    cardBackPicture: {
        type: String,
        required: true,
    },

    wants: {
        type: [String],
        default: [],
        required: true
    },

    wantsImgs: {
        type: [String],
        default: [],
        required: true
    },

})
const Post = mongoose.model('Post', postSchema);
module.exports = Post;