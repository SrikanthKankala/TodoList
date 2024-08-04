

//C:\Users\kanka\OneDrive\Desktop\to-do-list-app\todo-list-app\src\components\TodoList.js






import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        fetch('/data/tasks.json')
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    const addTask = (task) => {
        setTasks(prevTasks => [task, ...prevTasks]); 
    };

    const updateTask = (id, updatedTask) => {
        setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    };

    const markAsDone = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, done: true } : task));
    };

    const unmarkAsDone = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, done: false } : task));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedTasks = [...filteredTasks].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search Task..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <TaskForm addTask={addTask} />
            <ul>
                {sortedTasks.map(task => (
                    <Task 
                        key={task.id} 
                        task={task} 
                        updateTask={updateTask} 
                        markAsDone={markAsDone} 
                        unmarkAsDone={unmarkAsDone} 
                        deleteTask={deleteTask} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
