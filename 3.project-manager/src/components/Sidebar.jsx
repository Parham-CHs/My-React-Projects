export default function sidebar({ setCreateProject, projects, editProject }) {
    return (
        <aside className="w-72 h-screen bg-black text-white rounded-r-2xl p-8 mt-8">
            <h2 className="text-2xl font-bold mb-10">
                YOUR PROJECTS
            </h2>

            <button
                className="bg-zinc-800 text-zinc-400 px-5 py-3 rounded-lg font-semibold hover:bg-zinc-700"
                onClick={setCreateProject}>
                + Add Project
            </button>

            <div className="flex flex-col gap-2">
                {projects.map(project => (
                    <button onClick={() => editProject(project.id)}
                        key={project.id}
                        className="
                            w-full
                            text-left
                            px-4
                            py-3
                            rounded-lg
                            text-lg
                            font-medium
                            text-zinc-300
                            hover:bg-zinc-800
                            hover:text-white
                            transition-colors
                        "
                    >
                        {project.title}
                    </button>
                ))}
            </div>

        </aside>
    );
}