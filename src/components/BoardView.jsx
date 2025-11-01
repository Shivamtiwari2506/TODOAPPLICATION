import React, { useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";
import moment from "moment";

const BoardView = ({ boardName, createdAt, tasks, handleSubmit, editTask,deleteTask }) => {

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        {boardName} Board
        <span className="text-sm font-normal text-gray-400 ml-4">
          Created at:{" "}
          <span className="font-semibold text-white">
            {moment(createdAt).format("YYYY-MM-DD, h:mm A")}
          </span>
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[85vh]">
        <TaskColumn
          title="To Do"
          tasks={tasks?.todo}
          status="todo"
          handleSubmit={handleSubmit}
          deleteTask={deleteTask}
          editTask={editTask}
          boardName={boardName}
        />

        <TaskColumn
          title="In Progress"
          tasks={tasks?.inprogress}
          status="inprogress"
          handleSubmit={handleSubmit}
          deleteTask={deleteTask}
          editTask={editTask}
          boardName={boardName}
        />

        <TaskColumn
          title="Done"
          tasks={tasks?.done}
          status="done"
          handleSubmit={handleSubmit}
          deleteTask={deleteTask}
          boardName={boardName}
          editTask={editTask}
        />
      </div>
    </div>
  );
};

export default BoardView;
