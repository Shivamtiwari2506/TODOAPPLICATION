import React from "react";
import { IconTrash, IconEdit  } from "@tabler/icons-react";
import moment from "moment";

const TaskCard = ({ task, onDelete, onEdit }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md shadow-black hover:bg-gray-700 transition flex flex-col gap-2 border-2 border-gray-500">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-white">
          {task?.title || "Untitled Task"}
        </h3>
        <div className=" flex items-center gap-3">
        <button
          onClick={onEdit}
          className="text-red-400 hover:text-red-500 transition"
        >
          <IconEdit size={18} />
        </button>
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-500 transition"
        >
          <IconTrash size={18} />
        </button>
        </div>
      </div>

      {task?.description && (
        <p className="text-gray-300 text-sm text-ellipsis truncate">{task?.description || "no description added"}</p>
      )}

      <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-400">
        <div>
          <span className="font-medium text-gray-300">Status:</span>{" "}
          {task?.status || "Not Set"}
        </div>
        <div>
          <span className="font-medium text-gray-300">Priority:</span>{" "}
          {task?.priority || "Normal"}
        </div>
        <div>
          <span className="font-medium text-gray-300">Assigned To:</span>{" "}
          {task?.assignedTo || "Unassigned"}
        </div>
        <div>
          <span className="font-medium text-gray-300">Due Date:</span>{" "}
          {task?.dueDate
            ? moment(task.dueDate).format("DD MMM YYYY")
            : "No Date"}
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-300">Board:</span>{" "}
          {task?.board || "Not Linked"}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
