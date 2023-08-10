import { createBrowserRouter } from "react-router-dom";
import TopView from "./components/TopView";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import CreatePost from "./views/CreatePost";
import PostView from "./views/PostView";

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
    {
        path: "create/",
        element: <CreatePost />,
    },
    {
        path: "post/:id",
        element: <PostView />,
    },
]);

export default router;
