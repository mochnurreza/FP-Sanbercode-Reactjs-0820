import React, { createContext, useState } from "react";

export const Navcontext = createContext();

export const NavProvider = (props) => {
    const [open, setOpen] = useState(false);
    return(
        <Navcontext.Provider value={{ open, setOpen }}>
        {props.children}
        </Navcontext.Provider>
    )
}