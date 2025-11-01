import React, { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";


const TaskColumn = ({ title, tasks, status, handleSubmit, onRemoveTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (task) => {
    setShowModal(true);
    setIsEditing(true);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={() => setShowModal(!showModal)}
          className="text-indigo-400 hover:text-indigo-500 transition"
        >
          <IconPlus size={20} />
        </button>
      </div>

      {showModal && (
        <AddTaskModal openModal={showModal} setShowModal={setShowModal} handleSubmit={handleSubmit} isEditing={isEditing}/>
      )}

      <div className="flex-1 space-y-3 overflow-y-scroll h-screen">
        {tasks.length === 0 && (
          <p className="text-gray-400 text-center">No tasks</p>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => onRemoveTask(status, task.id)}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
