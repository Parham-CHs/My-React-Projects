export default function EmptyProject({ setCreateProject }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">

      {/* Icon */}
      <img
        src="/src\assets\no-projects.png"
        alt="notepad"
        className="w-24 mb-6"
      />

      {/* Title */}
      <h2 className="text-3xl font-bold text-zinc-700 mb-4">
        No Project Selected
      </h2>

      {/* Description */}
      <p className="text-xl text-zinc-500 mb-12">
        Select a project or get started with a new one
      </p>

      {/* Button */}
      <button className="bg-zinc-900 text-white px-7 py-4 rounded-lg text-xl" onClick={setCreateProject}>
        Create new project
      </button>

    </div>
  );
}