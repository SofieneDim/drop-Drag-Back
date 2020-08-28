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
    initialPosition: {
        type: Object,
        default: {},
        required: true,
    },
    link: {
        type: String,
    },
});

module.exports = mongoose.model("Task", TaskSchema);
