import React from "react";
import { useContext } from "react";
import { useState } from "react";

const SelectedCategoriesContext = React.createContext({
    selectedCategories: [],
    setSelectedCategories: () => {},
});

export const PostProvider = ({ children }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    return (
        <SelectedCategoriesContext.Provider
            value={{ selectedCategories, setSelectedCategories }}
        >
            {children}
        </SelectedCategoriesContext.Provider>
    );
};

export const usePostContext = () => useContext(SelectedCategoriesContext);
