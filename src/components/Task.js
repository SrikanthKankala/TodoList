

// C:\Users\kanka\OneDrive\Desktop\to-do-list-app\todo-list-app\src\components\Task.js




import React, { useState } from 'react';

const Task = ({ task, updateTask, markAsDone, unmarkAsDone, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const [newDescription, setNewDescription] = useState(task.description);

    const handleUpdate = () => {
        const updatedTask = {
            ...task,
            title: newTitle,
            description: newDescription,
            timestamp: new Date().toISOString() 
        };
        updateTask(task.id, updatedTask);
        setIsEditing(false);
    };

    const handleCheckboxChange = () => {
        if (task.done) {
            unmarkAsDone(task.id);
        } else {
            markAsDone(task.id);
        }
    };

    return (
        <li style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px', position: 'relative' }}>
            {isEditing ? (
                <div>
                    <input 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)} 
                        style={{ width: '100%', marginBottom: '5px' }}
                    />
                    <textarea 
                        value={newDescription} 
                        onChange={(e) => setNewDescription(e.target.value)} 
                        style={{ width: '100%', marginBottom: '5px' }}
                    />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            ) : (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span
                                style={{
                                    textDecoration: task.done ? 'line-through' : 'none',
                                    fontSize: '1.2em',
                                    fontWeight: 'bold',
                                }}
                            >
                                {task.title}
                            </span>
                            <div style={{ fontSize: '0.8em', color: '#888' }}>
                                {new Date(task.timestamp).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })} {/* date, month, year */}
                                {" at "}
                                {new Date(task.timestamp).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true
                                })} {/* Display time  */}
                            </div>
                        </div>

                       
                        <div style={{ position: 'absolute', right: '10px', top: '30px', color: task.done ? 'green' : 'transparent', fontWeight: 'bold' }}>
                            {task.done && 'Task Completed'}
                        </div>
                    </div>
                    <div style={{ marginTop: '10px', marginBottom: '10px', fontSize: '1em', color: '#555' }}>
                        {task.description}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        {task.done ? (
                            <button onClick={() => unmarkAsDone(task.id)}>Unmark as Done</button>
                        ) : (
                            <button onClick={() => markAsDone(task.id)}>Mark as Done</button>
                        )}
                    </div>
                </div>
            )}
        </li>
    );
};

export default Task;
