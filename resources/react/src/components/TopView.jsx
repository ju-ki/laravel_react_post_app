import Header from "./Header";
import { useAuthStateContext } from "../context/AuthContext";
import axiosClient from "../axios";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";

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
                                    className="border px-12 py-6 my-4 cursor-pointer flex items-center justify-between"
                                >
                                    <div className="flex items-center">
                                        <img
                                            className="w-12 h-12 mr-6"
                                            src={post.image_path}
                                        />
                                        <div>
                                            <p className="text-xl font-bold">
                                                {post.title}
                                            </p>
                                            <p>{post.body}</p>
                                        </div>
                                    </div>
                                    <div className="float-right">
                                        {post.days_ago}
                                    </div>
                                </li>
                            </a>
                        </>
                    ))}
                </ul>
            </div>
        </>
    );
}
