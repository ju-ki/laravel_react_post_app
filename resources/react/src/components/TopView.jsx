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
                console.log(response);
                setLatestPosts(response.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <Header />
            <div className="container mx-auto">
                <h1>TopView</h1>
                {token ? "ログインされています" : "ログインされていません"}
                <h1 className="text-3xl">最新の投稿</h1>
                <ul>
                    {latestPosts.map((post) => (
                        <>
                            <a href={`post/${post.id}`}>
                                <li
                                    key={post.id}
                                    className="border px-12 py-6 my-4 cursor-pointer"
                                >
                                    Title: {post.title}, Body: {post.body}
                                    Date: {post.created_at}
                                </li>
                            </a>
                        </>
                    ))}
                </ul>
            </div>
        </>
    );
}
