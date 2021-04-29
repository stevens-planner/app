import React, { useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import { board } from "./CourseData";
import "./DragComponent.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

function ControlledBoard() {
  const [controlledBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);

    const id = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref("users/" + id)
      .set({
        updatedBoard,
      });
  }

  function updateBoard() {
    const id = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + id + "/updatedBoard")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        setBoard(data);
      });
  }
  document.body.style.backgroundColor = "#ffffff";
  return (
    <div>
      <h1>Stevens Study Planner</h1>
      <button onClick={updateBoard}>Update</button>
      <Board onCardDragEnd={handleCardMove}>{controlledBoard}</Board>
      {/*<button onClick={setInitialBoard}>Send</button>*/}
    </div>
  );
}

export default ControlledBoard;
