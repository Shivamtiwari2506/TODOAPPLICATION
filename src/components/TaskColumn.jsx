import React, { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";


const TaskColumn = ({ title, tasks, status, handleSubmit, onRemoveTask, editTask, deleteTask, boardName }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const handleEdit = (task) => {
    setShowModal(true);
    setIsEditing(true);
    setEditingData(task);
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
        <AddTaskModal openModal={showModal} setShowModal={setShowModal} handleSubmit={handleSubmit} isEditing={isEditing}
        editTask={editTask}
        editingData={editingData}
        />
      )}

      <div className="flex-1 space-y-3 overflow-y-scroll h-screen">
        {tasks.length === 0 && (
          <p className="text-gray-400 text-center">No tasks</p>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={() => deleteTask(task._id)}
            onEdit={handleEdit}
            boardName={boardName}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
