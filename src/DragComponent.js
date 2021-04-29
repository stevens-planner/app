import React, { useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import { Link } from "react-router-dom";

import { board } from "./CourseData";
import "./DragComponent.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { Button } from "react-bootstrap";

function ControlledBoard() {
  const [controlledBoard, setBoard] = useState(board);
  const userEmail = firebase.auth().currentUser.email;

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          // Sign-out successful.
        },
        function (error) {
          // An error happened.
        }
      );
  }

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
      <h4>Welcome, {userEmail}</h4>
      <button onClick={updateBoard}>View My Plan</button>
      <Link>
        <button onClick={signOut}>Logout</button>
      </Link>
      <Board onCardDragEnd={handleCardMove}>{controlledBoard}</Board>
    </div>
  );
}

export default ControlledBoard;
