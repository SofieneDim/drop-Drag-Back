const express = require("express");
app = express();
bodyParser = require("body-parser");
db = require("./db");
port = process.env.NODE_PORT || 3000;

const DomTask = require('./models/taskDom');
const TaskModel = require('./models/taskModel');

app.set("view engine", "ejs");

// Middelwares
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

// Routes
app.get("/", (req, res) => {
    console.log('res', res)
    const domTasks = DomTask.find();
    const tasksModels = DomTask.find();
    res.json({ domTasks, tasksModels, cok: "ee" });
});

app.post("/add-task-model", async (req, res) => {
    const { id, icon, color, form } = req.body;
    const newTaskModel = new TaskModel({
        id, icon, color, form
    });
    try {
        const result = await newTaskModel.save();
        res.send(result);
    } catch (err) {
        res.send({ message: err.message });
    };
});

app.post("/add-dom-task", async (req, res) => {
    const { id, modelId, link, position } = req.body;
    const newTask = new DomTask({id, modelId, link, position});
    try {
        const result = await newTask.save();
        res.send(result);
    } catch (err) {
        res.send({ message: err.message });
    };
});

app.patch("/update-task", async (req, res) => {
    const { id, icon, color, form, title, link, position  } = req.body;
    const oldTask = DomTask.findOne({id});
    const updatedTask = {
        ...oldTask,
        id: id ? id : oldTask.id,
        icon: icon ? icon : oldTask.icon,
        color: color ? color : oldTask.color,
        form: form ? form : oldTask.form,
        title: title ? title : oldTask.title,
        link: link ? link : oldTask.link,
        position: position ? position : oldTask.position,
    };
    try {
        await DomTask.updateOne({ id }, updatedTask);
        res.send(result);
    } catch (err) {
        res.send({ message: err.message });
    };
});

app.listen(port, () => console.log(`Server started on port ${port}`));

