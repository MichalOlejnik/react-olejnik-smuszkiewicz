import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ProductsList from "../components/Products/ProductsList";

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
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();

const colRef = collection(db, "products");

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  products: [],
  login: (token) => {},
  logout: () => {},
  addUser: (email, password) => {},
  loginUser: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  
  const loginHandler = (token) => {
      setToken(token);
    };
    
    const logoutHandler = () => {
    setToken(null);
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
        console.log("user created: ", cred.user);
        loginHandler(cred.user.accessToken);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user logged in: ", cred.user);
        loginHandler(cred.user.accessToken);
      })
      .catch((err) => {
        console.log(err.message);
    });
  };

  const getProducts = () => {
      const products = [];
    getDocs(colRef)
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id });
        });
        console.log(products);
        return products
      })
      .catch((err) => {
          console.log(err.message);
        });
    };

    const products = getProducts();
    
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    products:products,
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
