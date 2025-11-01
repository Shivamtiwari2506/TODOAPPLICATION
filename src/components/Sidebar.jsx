import React, { useState } from "react";
import { IconPlus, IconLayoutKanban, IconTrash  } from "@tabler/icons-react";

const Sidebar = ({ boards, currentBoard, onAddBoard, activeBoard, handleDelete }) => {
  const [newBoard, setNewBoard] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAdd = () => {
    if (newBoard.trim()) {
      onAddBoard(newBoard);
      setNewBoard("");
      setShowInput(false);
    }
  };

  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Boards</h2>
        <button
          onClick={() => setShowInput(!showInput)}
          className="text-indigo-400 hover:text-indigo-500 transition"
        >
          <IconPlus size={20} />
        </button>
      </div>

      {showInput && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Board name"
            value={newBoard}
            onChange={(e) => setNewBoard(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded-lg mb-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAdd}
            className="w-full bg-indigo-500 hover:bg-indigo-600 p-2 rounded-lg text-sm"
          >
            Create
          </button>
        </div>
      )}

      <div className="space-y-2 overflow-y-auto flex-1">
        {boards?.length > 0  ? boards.map((board) => (
          <div className={`flex items-center justify-between gap-2 p-2 rounded-lg cursor-pointer transition ${
            activeBoard?.id === board.id
              ? "bg-indigo-600"
              : "hover:bg-gray-700"
          }`}
          key={board.id}
          >
          <div
            
            onClick={() => currentBoard(board)}
            className="flex items-center gap-2 flex-1 text-white"
          >
            <IconLayoutKanban size={18} />
            <span className="text-ellipsis">{board?.boardName}</span>
          </div>
            <span><IconTrash stroke={1} size={18} onClick={() => handleDelete(board?._id)} /></span>
          </div>
        )): (
          <p className="text-gray-400 text-sm text-center">No boards available. Please add a board.</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
