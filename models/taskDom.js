var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    modelId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        minlength: 3,
    },
    link: {
        type: String,
    },
});

module.exports = mongoose.model("Task", TaskSchema);
