import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ ref }) {
  const modalRef = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      modalRef.current.showModal();
    },
  }));


  return createPortal(
    <dialog
      ref={modalRef}
      className="rounded-xl p-0 backdrop:bg-black/50"
    >
      <div className="bg-white p-8 w-[400px]">

        <h2 className="text-2xl font-bold mb-4">
          Missing Information
        </h2>

        <p className="text-gray-600 mb-6">
          Please fill in all the fields before saving.
        </p>

        <button
          onClick={() => modalRef.current.close()}
          className="bg-black text-white px-6 py-3 rounded-lg font-medium"
        >
          OK
        </button>

      </div>
    </dialog>,
    document.body
  );
}
