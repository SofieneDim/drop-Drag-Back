const express = require("express");
app = express();
bodyParser = require("body-parser");
db = require("./db");
port = process.env.NODE_PORT || 3000;

const Task = require('./models/taskModel');

app.set("view engine", "ejs");

// Middelwares
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({
    origin: function (origin, callback) {
        console.log('origin:', origin)
        return callback(null, true);
    }
}))

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("crossorigin", true);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// Routes
app.get("/", (req, res) => {
    console.log('get');
    res.status(200).send("ree");
});

app.post("/add-task", async (req, res) => {
    const { id, icon, color, form } = req.body;
    const newTask = new Task({
        id, icon, color, form
    });
    try {
        const result = await newTask.save();
        res.send(result);
    } catch (err) {
        res.send({ message: err.message });
    };
});

app.listen(port, () => console.log(`Server started on port ${port}`));

