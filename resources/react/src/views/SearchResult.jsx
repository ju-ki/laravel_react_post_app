import { useEffect } from "react";
import Header from "../components/Header";
import { useLocation, useSearchParams } from "react-router-dom";
import axiosClient from "../axios";
import { useState } from "react";
export default function SearchResult() {
    const location = useLocation();
    const [searchParam] = useSearchParams();
    const query = searchParam.get("q");
    const cat = searchParam.get("cat");
    const [matchedPosts, setMatchedPosts] = useState([]);

    useEffect(() => {
        if (query != null) {
            axiosClient
                .post(`/search/word/${query}`)
                .then((response) => {
                    setMatchedPosts(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (cat != null) {
            axiosClient
                .post(`/search/category/${cat}`)
                .then((response) => {
                    setMatchedPosts(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [location.search]);

    return (
        <>
            <Header />
            <div className="container mx-auto">
                <h1 className="text-3xl my-5">
                    検索結果 : {query ? query : cat}
                </h1>
                {matchedPosts.length ? (
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
                    ))
                ) : (
                    <>
                        <h1 className="text-center text-2xl">
                            指定された単語に一致する結果は見つかりませんでした!
                        </h1>
                    </>
                )}
            </div>
        </>
    );
}
