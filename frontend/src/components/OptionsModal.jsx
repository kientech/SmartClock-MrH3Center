import React from "react";

const OptionsModal = ({ isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-64">
        <h2 className="text-xl font-semibold mb-4">Options</h2>
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-2"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="w-full bg-red-500 text-white px-4 py-2 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          className="w-full bg-gray-300 text-black px-4 py-2 rounded mt-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OptionsModal;
