import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import BoardView from "../components/BoardView";
import api from "../services/axiosInstance";
import toast from "react-hot-toast";

const TodoApp = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [boards, setBoards] = useState([]); //all the boards
  const [activeBoard, setActiveBoard] = useState(null);
  const [tasks, setTasks] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });

  const getAllTasks = async (boardId) => {
    if (!boardId) return;
    try {
      const response = await api.get(`/tasks/board/?boardId=${boardId}`);
      if (response?.data?.success) {
        setAllTasks(response?.data?.tasks);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch tasks");
    }
  };

  const getAllBoards = async () => {
    try {
      const response = await api.get("/boards");
  
      if (response?.data?.success === true) {
        const fetchedBoards = response.data.boards;
        setBoards(fetchedBoards);
  
        if (fetchedBoards.length > 0) {
          localStorage.setItem("activeBoard", fetchedBoards[0]._id);
          setActiveBoard(fetchedBoards[0]);
          getAllTasks(fetchedBoards[0]._id);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch boards");
    }
  };

  const currentBoard = (board) => {
    setActiveBoard(board);
    localStorage.setItem("activeBoard",board._id);
  };

  const handleAddBoard = async (boardName) => {
    try {
      const response = await api.post("/boards", { boardName });
      if (response?.data?.success) {
        toast.success(response.data.message);
        getAllBoards();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add board");
    }
  };

  const handleDelete = async (boardId) => {
    try {
      const response = await api.delete(`/boards/${boardId}`);
      if (response?.data?.success) {
        toast.success(response.data.message);
        getAllBoards();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete board");
    }
  };

  const handleSubmit = async (taskFields) => {
    const boardId = JSON.parse(localStorage.getItem("activeBoard"));
    if (!boardId) {
      toast.error("Please select a board first");
      return;
    }
    try {
      const payload = { ...taskFields, boardId };
      const response = await api.post("/tasks", payload);
      if (response?.data?.success) {
        toast.success(response.data.message);
        getAllTasks(boardId);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add task");
    }
  };

  useEffect(() => {
    if (activeBoard) {
      localStorage.setItem("activeBoard", JSON.stringify(activeBoard._id));
    }
  }, [activeBoard]);

  useEffect(() => {
    const boardId = localStorage?.getItem("activeBoard");
    if (boardId) {
      const grouped = {
        todo: allTasks.filter(
          (t) => t.status?.toLowerCase() === "todo"
        ),
        inprogress: allTasks.filter(
          (t) =>
            t.status?.toLowerCase() === "inprogress"
        ),
        done: allTasks.filter(
          (t) => t.status?.toLowerCase() === "done"
        ),
      };
      setTasks(grouped);
    }
  }, [allTasks]);

  useEffect(() => {
    getAllBoards();
  }, []);

  useEffect(() => {
    getAllTasks(activeBoard?._id);
  }, [activeBoard])

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        boards={boards}
        currentBoard={currentBoard}
        onAddBoard={handleAddBoard}
        activeBoard={activeBoard}
        handleDelete={handleDelete}
      />
      <div className="flex-1 p-6">
        {activeBoard ? (
          <BoardView
            key={activeBoard._id}
            boardName={activeBoard.boardName}
            createdAt={activeBoard.createdAt}
            tasks={tasks}
            handleSubmit={handleSubmit}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select or create a board to get started
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
