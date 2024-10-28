const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({


    cardApiId: {
        type: String,
        required: true,
    },
   

})