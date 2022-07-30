import {  createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

export const AuthContext = createContext();

//We wrap all the Routes with this so it passes the user state to all of its children
//and using this we check if the admin is logged in or not

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        setUser(user);
    });
  },[]);

    return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
