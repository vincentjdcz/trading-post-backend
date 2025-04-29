const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    cardApiId: {
        type: String,
        required: true,
    },

    cardName: {
        type: String,
        required: true,
    },

    setName: {
        type: String,
        required: true,
    },

    setNumber: {
        type: String,
        required: true,
    },

    setTotal: {
        type: String,
        required: true,
    },

    setId: {
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
    status: {
        type: String,
        default: "Open" //either Open or Resolved
    },

})
const Post = mongoose.model('Post', postSchema);
module.exports = Post;