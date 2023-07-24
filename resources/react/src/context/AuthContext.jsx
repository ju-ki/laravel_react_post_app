import React, { useContext, useState } from "react";

const AuthStateContext = React.createContext({
    currentUser: null,
    token: null,
    setCurrentUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState("");
    const [token, _setToken] = useState("");

    const setToken = (token) => {
        if (token) {
            localStorage.setItem("TOKEN", token);
        } else {
            localStorage.removeItem("TOKEN");
        }
        _setToken(token);
    };

    return (
        <AuthStateContext.Provider
            value={(currentUser, setCurrentUser, token, setToken)}
        >
            {children}
        </AuthStateContext.Provider>
    );
};

export const useAuthStateContext = () => useContext(AuthStateContext);
