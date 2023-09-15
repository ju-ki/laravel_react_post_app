import { useEffect } from "react";
import Header from "../components/Header";
import { useLocation, useSearchParams } from "react-router-dom";
import axiosClient from "../axios";
import { useState } from "react";
export default function SearchResult() {
    const location = useLocation();
    const [searchParam] = useSearchParams();
    const query = searchParam.get("q");
    const [matchedPosts, setMatchedPosts] = useState([]);

    useEffect(() => {
        console.log(matchedPosts);
    }, [matchedPosts]);

    useEffect(() => {
        axiosClient
            .post(`/search/${query}`)
            .then((response) => {
                setMatchedPosts(response.data);
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [location.search]);

    return (
        <>
            <Header />
            <div>検索結果画面</div>
            {matchedPosts &&
                matchedPosts.map((post) => (
                    <>
                        <a href={`post/${post.id}`}>
                            <li
                                key={post.id}
                                className="border px-12 py-6 my-4 cursor-pointer flex items-center justify-between"
                            >
                                <div className="flex items-center">
                                    <img
                                        className="w-12 h-12 mr-6"
                                        src={post.image}
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
        </>
    );
}
