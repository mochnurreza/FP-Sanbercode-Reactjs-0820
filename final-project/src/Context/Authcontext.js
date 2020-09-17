import React, { createContext, useState } from "react";

export const Authcontext = createContext();

export const AuthProvider = (props) => {
    const dataUser = JSON.parse(localStorage.getItem("user"));
    const currentUser = dataUser ? dataUser : null;
    const [user, setUser] = useState(currentUser);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
          {props.children}
        </AuthContext.Provider>
      );    
};