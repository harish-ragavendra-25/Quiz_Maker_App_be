const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: true
    },

    option_A:{
        type: String,
        required: true
    },

    option_B: {
        type: String,
        required: true
    },

    option_C: {
        type: String,
        required: true
    },

    option_D: {
        type: String,
        required: true
    },

    answer:{
        type: String,
        required: true
    }},
    {
        timestamps:true
    }
);

const questionModel = mongoose.model('questionModel',questionSchema);

module.exports = questionModel;