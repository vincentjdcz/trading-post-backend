const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending",
    },
    cardImages: [
        {
            cardFrontPicture: { type: String, required: true },
            cardBackPicture: { type: String, required: true}
        }
    ]

})

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;