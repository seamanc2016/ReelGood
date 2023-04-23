import { useState, createContext } from 'react';

// Creates a context, basically creates a scope
export const AuthContext = createContext();

//Creates AuthContext hook
export const AuthContextProvider = ({children}) => {
  const [Auth, setAuth] = useState(false);

  // which values will be avaliable through context
  const value = {
    Auth,
    setAuth,

  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}