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
            .get("/home")
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
                <h1 className="text-3xl">最新の投稿</h1>
                {/* {latestPosts} */}
                {latestPosts.map((post) => (
                    <>
                        <a href={`post/
                        ${post.id}`}>
                            <li
                                key={post.id}
                                className="border-r border-l border-b border-t px-12 py-6 my-4 cursor-pointer"
                            >
                                Title: {post.title}, Body: {post.body}
                            </li>
                        </a>
                    </>
                ))}
            </ul>
        </>
    );
}
