var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    icon: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "grey",
        required: true,
    },
    form: {
        type: String,
        default: "circle",
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
