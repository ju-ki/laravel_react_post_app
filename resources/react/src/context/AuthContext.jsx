import { useContext, useState, createContext } from "react";

const AuthStateContext = createContext({
    currentUser: null,
    token: null,
    setCurrentUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState("");
    const [token, _setToken] = useState(localStorage.getItem("TOKEN") || "");

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
            value={{ currentUser, setCurrentUser, token, setToken }}
        >
            {children}
        </AuthStateContext.Provider>
    );
};

export const useAuthStateContext = () => useContext(AuthStateContext);
