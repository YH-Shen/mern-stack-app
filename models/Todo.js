const mongoose = require("mongoose");

//  Schema => a blue print that every document in this collection has to follow
const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
   

module.exports = mongoose.model("Todo", TodoSchema);