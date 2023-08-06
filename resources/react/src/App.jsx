import { ContextProvider } from "./context/AuthContext";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import CategorySelector from "./components/CategorySelector";
import { useState } from "react";

export default function App() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    return (
        <>
            <ContextProvider>
                <RouterProvider router={router}>
                    <CategorySelector
                        setSelectedCategories={setSelectedCategories}
                    />
                </RouterProvider>
            </ContextProvider>
        </>
    );
}
