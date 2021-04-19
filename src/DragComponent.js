import React, { useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import "./DragComponent.css";

const board = {
  columns: [
    {
      id: 1,
      title: "Transfer Credit",
      cards: [
        {
          id: 1,
          title: "CH115 - General Chemistry I",
          description: "Card content",
        },
        {
          id: 2,
          title: "MA121: Differential Calculus",
          description: "Card content",
        },
        {
          id: 3,
          title: "E120 - Engineering Graphics",
          description: "Card content",
        },
      ],
    },
    {
      id: 2,
      title: "Semester 1",
      cards: [
        {
          id: 9,
          title: "E115 - Introduction to Programming",
          description: "Card content",
        },
      ],
    },
    {
      id: 3,
      title: "Semester 2",
      cards: [
        {
          id: 10,
          title: "PEP111 - Mechanics",
          description: "Card content",
        },
        {
          id: 11,
          title: "E122 - Engineering Design II",
          description: "Card content",
        },
      ],
    },
    {
      id: 4,
      title: "Semester 3",
      cards: [
        {
          id: 12,
          title: "MA221 - Differential Equations",
          description: "Card content",
        },
        {
          id: 13,
          title: "E126 - Mechanics of Solids",
          description: "Card content",
        },
      ],
    },
  ],
};

function ControlledBoard() {
  const [controlledBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  return (
    <Board onCardDragEnd={handleCardMove} disableColumnDrag>
      {controlledBoard}
    </Board>
  );
}

export default ControlledBoard;
