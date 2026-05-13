import { createContext, useContext, useState } from "react";

export const UnreadContext = createContext({});

export const UnreadProvider = ({ children }) => {
    const [unread, setUnread] = useState({});
    console.log("hellowuhve7yhbvenj",unread)
    return (
        <UnreadContext.Provider value={{ unread, setUnread }}>
            {children}
        </UnreadContext.Provider>
    );
};

export const useUnread = () => useContext(UnreadContext);