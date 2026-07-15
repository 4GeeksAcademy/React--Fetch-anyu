import React, { useState } from "react";

const Home = () => {

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    return (
        <div className="container">

            

            <input
                type="text"
                placeholder="Lista de tareas"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && task.trim() !== "") {
                        setTasks([...tasks, task]);
                        setTask("");
                    }
                }}
            />

            <ul>
                {tasks.length === 0 ? (
                    <li>No hay tareas, añadir tareas</li>
                ) : (
                    tasks.map((item, index) => (
                        <li key={index}>
                            {item}
                            <span
                                onClick={() =>
                                    setTasks(tasks.filter((_, i) => i !== index))
                                }
                            >
                                ✖️
                            </span>
                        </li>
                    ))
                )}
            </ul>

            <p>{tasks.length} tareas restantes</p>

        </div>
    );
};

export default Home;