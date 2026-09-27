import { useRef } from "react";
import Modal from "./Modal.jsx"


export default function EditProject({ projects, projectId, setProjects, deleteProject }) {

    // console.log("PROJECTS:", projects);
    // console.log("PROJECT ID:", projectId);
    // console.log("PROJECT ID TYPE:", typeof projectId);

    const taskRef = useRef();
    const modalRef = useRef();

    function addTask() {

        const task = taskRef.current.value.trim();
        if (!task) {
            modalRef.current.open();
            return;
        }

        const newTask = {
            id: Date.now(),
            title: taskRef.current.value
        };

        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.id === projectId
                    ? {
                        ...project,
                        tasks: [...project.tasks, newTask]
                    }
                    : project
            )
        );
        taskRef.current.value = "";
    }

    function deleteTask(taskId) {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.id === projectId
                    ? {
                        ...project,
                        tasks: project.tasks.filter(task => task.id !== taskId)
                    }
                    : project
            )
        );
    }


    const project = projects.find(editingproject => editingproject.id === projectId);

    return (
        <>
            <main className="flex-1 px-14 py-12">
                {console.log(projects)}
                {console.log(projectId, typeof projectId)}

                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-zinc-800">
                            {project.title}
                        </h1>

                        <p className="text-lg text-zinc-500 mt-3">
                            {project.dueDate}
                        </p>
                    </div>

                    <button
                        onClick={deleteProject}
                        className="text-lg text-zinc-800 hover:text-red-600">
                        Delete
                    </button>
                </div>

                {/* Description */}
                <p className="text-xl text-zinc-800 mb-10">
                    {project.description}
                </p>

                {/* Divider */}
                <hr className="border-zinc-400 mb-8" />


                {/* Tasks */}
                <section>

                    <h2 className="text-3xl font-bold text-zinc-800 mb-6">
                        Tasks
                    </h2>

                    {/* Add Task */}
                    <div className="flex items-center gap-6 mb-8">
                        <input
                            ref={taskRef}
                            type="text"
                            className="w-96 bg-zinc-300 border-2 border-blue-600 rounded-lg px-3 py-3 outline-none"
                        />

                        <button
                            onClick={addTask}
                            className="text-xl text-zinc-800">
                            Add Task
                        </button>
                    </div>

                    {project.tasks.length === 0 ? (
                        <p className="text-xl text-zinc-800">
                            This project does not have any tasks yet.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {project.tasks.map(task => (
                                <div
                                    key={task.id}
                                    className="flex items-center justify-between bg-zinc-300 rounded-lg px-4 py-3"
                                >
                                    <p className="text-xl text-zinc-800">
                                        {task.title}
                                    </p>

                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                </section>

            </main>
            <Modal ref={modalRef} />
        </>
    );
}