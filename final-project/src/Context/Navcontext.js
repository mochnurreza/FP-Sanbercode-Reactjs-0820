import React, { createContext, useState } from "react";

export const Navcontext = createContext();

export const NavProvider = (props) => {
    const [open, setOpen] = useState(false);
    return(
        <NavContext.Provider value={{ open, setOpen }}>
        {props.children}
        </NavContext.Provider>
    )
}