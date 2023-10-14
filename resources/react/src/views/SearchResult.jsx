import { useEffect } from "react";
import Header from "../components/Header";
import { useLocation, useSearchParams } from "react-router-dom";
import axiosClient from "../axios";
import { useState } from "react";
import Paginate from "../components/Paginate";
export default function SearchResult() {
    const location = useLocation();
    const [searchParam] = useSearchParams();
    const query = searchParam.get("q");
    const cat = searchParam.get("cat");
    const allResults = searchParam.get("all");
    const page = searchParam.get("page") || 1;
    const [matchedPosts, setMatchedPosts] = useState([]);

    useEffect(() => {
        if (query != null) {
            axiosClient
                .post(`/search/word/${query}?page=${page}`)
                .then((response) => {
                    console.log(response.data);
                    setMatchedPosts(response.data.matchedPosts);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (cat != null) {
            axiosClient
                .post(`/search/category/${cat}?page=${page}`)
                .then((response) => {
                    console.log(response.data);
                    setMatchedPosts(response.data.matchedPosts);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (allResults != null) {
            console.log(page);
            axiosClient
                .get(`/search/all?page=${page}`)
                .then((response) => {
                    console.log(response.data);
                    setMatchedPosts(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [location.search]);

    function highlightTitle(title, query) {
        const regex = new RegExp(`(${query})`, "gi");
        return title.replace(regex, '<span class="bg-yellow-300">$1</span>');
    }

    return (
        <>
            <Header />
            <div className="container mx-auto">
                <h1 className="text-3xl my-5">
                    検索結果 : {query ? query : cat}
                </h1>

                {matchedPosts &&
                    matchedPosts.from &&
                    matchedPosts.to &&
                    matchedPosts.total && (
                        <p className="text-gray-600 mb-4">
                            {matchedPosts.from}-{matchedPosts.to} 件目を表示中
                            (全{matchedPosts.total}件中)
                        </p>
                    )}

                {matchedPosts && matchedPosts.current_page && (
                    <Paginate
                        currentPage={matchedPosts.current_page}
                        lastPage={matchedPosts.last_page}
                        queryType={query ? "q" : cat ? "cat" : "all"}
                        queryValue={query || cat || ""}
                    />
                )}
                {matchedPosts &&
                matchedPosts.data &&
                matchedPosts.data.length ? (
                    matchedPosts.data.map((post) => (
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
                                            <p
                                                className="text-xl font-bold"
                                                dangerouslySetInnerHTML={{
                                                    __html: highlightTitle(
                                                        post.title,
                                                        query
                                                    ),
                                                }}
                                            ></p>
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
