const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    checked : {
        type : Boolean,
        required : false
    }
});

module.exports = mongoose.model('Todo',TodoSchema);