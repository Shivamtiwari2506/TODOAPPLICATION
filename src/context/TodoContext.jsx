import React, { createContext, useState, useContext, Children } from 'react';

const TodoContext = createContext();

export const TodoProvider = (({children}) => {
   const [boards, setBoards] = useState([]);
   const [activeBoard, setActiveBoard] = useState(null);
} )