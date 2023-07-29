import { createBrowserRouter, Navigate } from "react-router-dom";
import TopView from "./components/TopView";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profile from "./views/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TopView />,
    },
    {
        path: "signup/",
        element: <Signup />,
    },
    {
        path: "login/",
        element: <Login />,
    },
    {
        path: "profile/",
        element: <Profile />,
    },
]);

export default router;
