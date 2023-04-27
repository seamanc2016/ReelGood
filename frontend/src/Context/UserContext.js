import { useState, useEffect, createContext } from 'react';
import {getAuth} from "firebase/auth";
import '../config/firebase-config';

// Creates a context, basically creates a scope
export const UserContext = createContext();

//Creates AuthContext hook that takes children
export const UserContextProvider = ({children}) => {
  const [User, setUser] = useState(false);
  const [Token, setToken] = useState(false)

  useEffect(() => {
    console.log("in effect");
    console.log(localStorage.getItem("user"))
    const currUser = localStorage.getItem("user");
    if(currUser)
      setUser(currUser);

  }, [])

  const CheckAuthStateChanged = () => {
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if(user){
        const StringUser = JSON.stringify(user)
        setUser(StringUser);
        setToken(Token)
        localStorage.setItem("user", StringUser);
        console.log(localStorage.getItem("user"));
      }else
        setUser(null)
        //localStorage.clear();
    })
  }


  // which values will be avaliable through context
  const value = {
    User,
    setUser,
    Token,
    setToken,
    CheckAuthStateChanged,
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}