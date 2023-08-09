import Header from "./Header";
import { useAuthStateContext } from "../context/AuthContext";
import axiosClient from "../axios";
import { useState } from "react";
import { useEffect } from "react";
export default function TopView() {
    const { token, currentUser } = useAuthStateContext();
    const [latestPosts, setLatestPosts] = useState([]);
    useEffect(() => {
        axiosClient
            .get("/posts")
            .then((response) => {
                setLatestPosts(response.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <Header />
            <h1>TopView</h1>
            {token ? "ログインされています" : "ログインされていません"}
            <ul>
                {/* {latestPosts} */}
                {latestPosts.map((post) => (
                    <li key={post.id}>
                        Title: {post.title}, Body: {post.body}
                    </li>
                ))}
            </ul>
        </>
    );
}
