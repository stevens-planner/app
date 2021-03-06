import React, { useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import { board, board2 } from "./CourseData";
import "./DragComponent.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { Dropdown } from "react-bootstrap";

function ControlledBoard() {
  const [controlledBoard, setBoard] = useState(board);
  const userEmail = firebase.auth().currentUser.email;

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          console.log("Sign out successful!");
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

  function softE() {
    setBoard(board);
  }

  function compE() {
    setBoard(board2);
  }

  function compSci() {
    setBoard(board2);
  }

  document.body.style.backgroundColor = "#ffffff";

  return (
    <div className="dashboard">
      <div id="container">
        <h2 className="text-title">
          <span id="title">STEVENS</span> STUDY
        </h2>
        <h1 className="text-title2">PLANNER</h1>
      </div>

      <h3 id="welcome">
        Welcome, {userEmail}! <br></br>Start developing your study plan today
        with <span id="welcome2">Stevens Study Planner.</span>
      </h3>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Choose Your Major
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={compE}>Computer Engineering</Dropdown.Item>
          <br></br>
          <Dropdown.Item onClick={softE}>Software Engineering</Dropdown.Item>
          <br></br>
          <Dropdown.Item onClick={compSci}>Computer Science</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <button className="plan-button" onClick={updateBoard}>
        View My Plan
      </button>

      <button className="signout-button" onClick={signOut}>
        Logout
      </button>

      <Board onCardDragEnd={handleCardMove}>{controlledBoard}</Board>
    </div>
  );
}

export default ControlledBoard;
