const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    offerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
        required: true,
    },
    users: {
        type: [String],
        required: true
    },
})

const Trade = mongoose.model("Trade", tradeSchema);
module.exports = Trade;