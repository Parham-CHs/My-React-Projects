import { useRef } from "react";
import Modal from "./Modal.jsx"

export default function NewProject({ setProjects, setNoProject }) {

  const modalRef = useRef();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();

  function handleSave(event) {
    event.preventDefault();

    const title = titleRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const dueDate = dueDateRef.current.value;

    if (!title || !description || !dueDate) {
      modalRef.current.open();
      return;
    }

    const newProject = {
      id: Date.now(),
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: dueDateRef.current.value,
      tasks:[]
    };

    setProjects(prevProjects => [
      ...prevProjects,
      newProject
    ]);

    setNoProject();
  }


  return (
    <>
      <main className="flex-1 px-14 py-12">

        {/* Cancel / Save */}
        <div className="flex justify-end items-center gap-8 mb-8">
          <button className="text-lg font-medium" onClick={setNoProject}>
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-black text-white px-7 py-4 rounded-lg text-lg font-medium">
            Save
          </button>
        </div>

        {/* Form */}
        <form className="max-w-4xl">

          {/* Title */}
          <div className="mb-8">
            <label className="block text-lg font-bold mb-2">
              TITLE
            </label>

            <input
              type="text"
              ref={titleRef}
              className="w-full bg-zinc-300 border-b-2 border-black px-2 py-3 text-lg outline-none"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-lg font-bold mb-2">
              DESCRIPTION
            </label>

            <textarea
              rows="3"
              ref={descriptionRef}
              className="w-full bg-zinc-300 px-2 py-3 text-lg outline-none resize-none"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-lg font-bold mb-2">
              DUE DATE
            </label>

            <input
              type="date"
              ref={dueDateRef}
              className="w-full bg-zinc-300 px-2 py-3 text-lg outline-none"
            />
          </div>

        </form>
      </main>
      <Modal ref={modalRef} />
    </>
  );
}


