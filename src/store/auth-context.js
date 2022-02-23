import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjKLmh1UYeqyMf8sgu1fi-h5Uefm03PbA",
  authDomain: "sklepik-olejnik-smuszkie-5edcf.firebaseapp.com",
  databaseURL:
    "https://sklepik-olejnik-smuszkie-5edcf-default-rtdb.firebaseio.com",
  projectId: "sklepik-olejnik-smuszkie-5edcf",
  storageBucket: "sklepik-olejnik-smuszkie-5edcf.appspot.com",
  messagingSenderId: "327887038671",
  appId: "1:327887038671:web:92b29183b831093217afba",
  measurementId: "G-7Q8BRCD284",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const userRef = collection(db, "users");
const auth = getAuth();

const AuthContext = React.createContext({
  token: "",
  isAdmin: false,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  addUser: (email, password) => {},
  loginUser: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
    setIsAdmin(false);
    signOut(auth)
      .then(() => {
        console.log("user signed out");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        loginHandler(cred.user.accessToken);
        setDoc(doc(userRef, cred.user.uid), {
          isAdmin: false,
        });
        getDoc(doc(userRef, cred.user.uid)).then((snapshot) => {
          setIsAdmin(snapshot.data().isAdmin);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        loginHandler(cred.user.accessToken);
        getDoc(doc(userRef, cred.user.uid)).then((snapshot) => {
          if (snapshot.data().isAdmin == true) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const contextValue = {
    token: token,
    isAdmin: isAdmin,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    addUser: addUser,
    loginUser: loginUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
