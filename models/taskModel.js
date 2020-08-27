var mongoose = require("mongoose");

var TaskModelSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("TaskModel", TaskModelSchema);
