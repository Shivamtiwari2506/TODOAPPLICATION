import { Button, Modal, Select, Input } from "antd";
import React, { useEffect, useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

const initialState = {
  title: "",
  description: "",
  status: "",
  priority: "",
  assignedTo: "",
  dueDate: "",
};

const ErrorField = ({ message }) => (
  <p className="text-red-500 text-xs mt-1 p-1 rounded-sm bg-red-100">
    {message}
  </p>
);

const AddTaskModal = ({ openModal, setShowModal, handleSubmit, isEditing }) => {
  const [taskFields, setTaskFields] = useState(initialState);
  const [isError, setIsError] = useState(false);
  const handleChange = (field, value) => {
    setIsError(false);
    setTaskFields((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = () => {
    const { title, description, status, priority, dueDate } = taskFields;

    if (!title.trim()) {
      setIsError("title");
      return;
    } else if (!description.trim()) {
      setIsError("description");
      return;
    } else if (!status.trim()) {
      setIsError("status");
      return;
    } else if (!priority.trim()) {
      setIsError("priority");
      return;
    } else if (!dueDate.trim()) {
      setIsError("dueDate");
      return;
    }

    setShowModal(false);
    handleSubmit(taskFields);
    setTaskFields(initialState);
  };

  useEffect(() => {
   if(isEditing) {
   }
  }, []);

  return (
    <Modal
      title={<span className="font-bold text-xl">Add New Task</span>}
      centered
      open={openModal}
      onCancel={() => setShowModal(false)}
      footer={
        <div className="mt-2 mb-2 flex gap-2 justify-end">
          <Button type="default" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button type="primary" onClick={onSubmit}>
            Save
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Task Title
            <span className="text-red-700 ml-0.5">*</span>
          </label>
          <Input
            placeholder="Enter task title"
            value={taskFields.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          {isError && isError == "title" && (
            <ErrorField message={"Title is required"} />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Task Description
            <span className="text-red-700 ml-0.5">*</span>
          </label>
          <TextArea
            rows={3}
            placeholder="Enter task description"
            value={taskFields.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          {isError && isError == "description" && (
            <ErrorField message={"description is required"} />
          )}
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Status
              <span className="text-red-700 ml-0.5">*</span>
            </label>
            <Select
              placeholder="Select status"
              className="w-full"
              value={taskFields.status}
              onChange={(value) => handleChange("status", value)}
            >
              <Option value="Todo">To Do</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Done">Done</Option>
            </Select>
            {isError && isError == "status" && (
              <ErrorField message={"status is required"} />
            )}
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Priority
              <span className="text-red-700 ml-0.5">*</span>
            </label>
            <Select
              placeholder="Select priority"
              className="w-full"
              value={taskFields.priority}
              onChange={(value) => handleChange("priority", value)}
            >
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
            {isError && isError == "priority" && (
              <ErrorField message={"Priority is required"} />
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Assigned To
            </label>
            <Input
              placeholder="Enter assignee name"
              value={taskFields.assignedTo}
              onChange={(e) => handleChange("assignedTo", e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Due Date
              <span className="text-red-700 ml-0.5">*</span>
            </label>
            <input
              type="date"
              className="w-full p-1 border-[1.5px] border-gray-200 rounded-lg focus:outline-none focus:ring-[0.75px] focus:ring-blue-300"
              value={taskFields?.dueDate || ""}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
            {isError && isError == "dueDate" && (
              <ErrorField message={"DueDate is required"} />
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
