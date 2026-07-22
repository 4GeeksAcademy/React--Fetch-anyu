import React, { useEffect, useState } from "react";

const Home = () => {
    const userName = "frodo-anyu";
    const apiUrl = "https://playground.4geeks.com/todo";

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const createUser = async () => {
        try {
            const response = await fetch(
                apiUrl + "/users/" + userName,
                {
                    method: "POST"
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo crear el usuario");
            }

            await getTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const getTasks = async () => {
        try {
            const response = await fetch(
                apiUrl + "/users/" + userName
            );

            if (response.status === 404) {
                await createUser();
                return;
            }

            if (!response.ok) {
                throw new Error("No se pudieron cargar las tareas");
            }

            const data = await response.json();
            setTasks(data.todos || []);
        } catch (error) {
            console.log(error);
        }
    };

    const addTask = async () => {
        if (task.trim() === "") {
            return;
        }

        try {
            const response = await fetch(
                apiUrl + "/todos/" + userName,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        label: task.trim(),
                        is_done: false
                    })
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo añadir la tarea");
            }

            setTask("");
            await getTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (todoId) => {
        try {
            const response = await fetch(
                apiUrl + "/todos/" + todoId,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo eliminar la tarea");
            }

            await getTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAllTasks = async () => {
        try {
            for (const item of tasks) {
                await fetch(apiUrl + "/todos/" + item.id, {
                    method: "DELETE"
                });
            }

            await getTasks();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Lista de tareas"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addTask();
                    }
                }}
            />

            <ul>
                {tasks.length === 0 ? (
                    <li>No hay tareas, añade una tarea</li>
                ) : (
                    tasks.map((item) => (
                        <li key={item.id}>
                            {item.label}

                            <span
                                onClick={() => deleteTask(item.id)}
                            >
                                ✖️
                            </span>
                        </li>
                    ))
                )}
            </ul>

            <p>{tasks.length} tareas restantes</p>

            {tasks.length > 0 && (
                <button onClick={deleteAllTasks}>
                    Limpiar todas las tareas
                </button>
            )}
        </div>
    );
};

export default Home;