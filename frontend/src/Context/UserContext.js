import { useState, createContext } from 'react';
import {getAuth} from "firebase/auth";
import '../config/firebase-config';

// Creates a context, basically creates a scope
export const UserContext = createContext();

//Creates AuthContext hook that takes children
export const UserContextProvider = ({children}) => {
  const [User, setUser] = useState(false);

  const CheckAuthStateChanged = () => {
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if(user)
        setUser(user);
      else
        setUser(null)
    })
  }


  // which values will be avaliable through context
  const value = {
    User,
    setUser,
    CheckAuthStateChanged,
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}