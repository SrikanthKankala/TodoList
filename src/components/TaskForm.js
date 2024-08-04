


//C:\Users\kanka\OneDrive\Desktop\to-do-list-app\todo-list-app\src\components\TaskForm.js



import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const newTask = {
            id: Date.now(),
            title: task,
            description: description,
            done: false,
            timestamp: currentDate.toISOString() // timestamp
        };
        addTask(newTask);
        setTask("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task title"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
