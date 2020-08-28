const express = require("express");
app = express();
db = require("./db");
port = process.env.NODE_PORT || 3000;

const DomTask = require('./models/taskDom');
const TaskModel = require('./models/taskModel');

// Middelwares
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Routes
app.get("/", async (req, res) => {
    const domTasks = await DomTask.find();
    const tasksModels = await TaskModel.find();
    res.json({ domTasks, tasksModels });
});

app.post("/add-task-model", async (req, res) => {
    const { id, icon, color, form, initialPosition } = req.body;
    const newTaskModel = new TaskModel({
        id, icon, color, form, initialPosition
    });
    try {
        const result = await newTaskModel.save();
        res.send(result);
    } catch (err) {
        res.send({ message: err.message });
    };
});

app.post("/add-dom-task", async (req, res) => {
    const { id, modelId, initialPosition } = req.body;
    const newTask = new DomTask({ id, modelId, initialPosition });
    try {
        const result = await newTask.save();
        res.send(result);
    } catch (err) {
        res.send({ message: err.message });
    };
});

app.patch("/update-task", async (req, res) => {
    const oldTask = await DomTask.findOne({ id: req.body.taskId });
    try {
        const result = await DomTask.updateOne(
            { id: req.body.taskId },
            { ...oldTask }
        );
        res.send(result);
    } catch (err) {
        res.send({ message: err.message });
    };
});

app.listen(port, () => console.log(`Server started on port ${port}`));

