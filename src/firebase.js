import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDm6QY8ab_W0Ph4_mRTfQprtwbDU24kD08",
  authDomain: "stevens-study-planner.firebaseapp.com",
  projectId: "stevens-study-planner",
  databaseURL: "https://stevens-study-planner-default-rtdb.firebaseio.com/",
  storageBucket: "stevens-study-planner.appspot.com",
  messagingSenderId: "348759418259",
  appId: "1:348759418259:web:a1471fdf22735e5a9ef466",
  measurementId: "G-D6X903YLC8",
});

export const auth = app.auth();
export default app;
