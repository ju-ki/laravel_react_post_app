import Echo from "laravel-echo";
import Pusher from "pusher-js";
window.Pusher = Pusher;
import Header from "../components/Header";
import axiosClient from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import CommentForm from "../components/CommentForm";
import CommentComponent from "../components/CommentComponent";
import "../index.css";
import { useAuthStateContext } from "../context/AuthContext";

export default function PostView() {
    const { token } = useAuthStateContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [body, setBody] = useState("");
    const [comments, setComments] = useState([]);
    const [commentId, setCommentId] = useState("");
    const [formComment, setFormComment] = useState("");
    //api送信を制限するために使用
    const [isUpVoted, setIsUpVoted] = useState(false);
    const [isDownVoted, setIsDownVoted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [postDetail, setPostDetail] = useState({
        isUpvoted: 0,
        post: {},
        viewCounter: 0,
        upvotedCount: 0,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);

    // 関数の変更
    const handleEditCommentId = (commentId) => {
        if (commentId == null) {
            setEditingCommentId(null);
            setFormComment("");
        } else {
            setEditingCommentId(commentId);
        }
    };

    const toggleEditing = () => {
        setIsEditing((prevState) => !prevState);
    };
    // const echo = new Echo({
    //     broadcaster: "pusher",
    //     key: "114a4dd3c3e065085bf3",
    //     cluster: "ap3",
    //     encrypted: true,
    // });

    const fetchComments = () => {
        axiosClient
            .get(`/comment/${id}`)
            .then((response) => {
                console.log(response.data);
                setComments(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        fetchComments();
        // handleRealTime();
        // return () => {
        //     echo.disconnect();
        // };
    }, []);

    // const handleRealTime = () => {
    //     echo.channel("comments").listen("CommentPostedEvent", (event) => {
    //         console.log(event);
    //         axiosClient
    //             .get(`/comment/${id}`)
    //             .then((response) => {
    //                 console.log("aa");
    //                 console.log(response);
    //                 setComments(response.data);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     });
    // };

    const onClickCategory = (currentCategory) => {
        navigate(`/search?cat=${currentCategory}`);
    };

    const handleUpVoteClick = () => {
        if (isDownVoted && !isUpVoted) {
            setIsDownVoted(false);
            setIsAnimating(true);
            setPostDetail((prevState) => ({
                ...prevState,
                upvotedCount: prevState.upvotedCount + 1,
            }));
            storeUpVote(1);
            setTimeout(() => {
                setIsAnimating(false);
                setIsUpVoted(true);
            }, 1500); // 1.5秒後にカラフルな色から青に変わる
        } else if (isUpVoted) {
            setIsUpVoted(false);
            storeUpVote(0);
            setPostDetail((prevState) => ({
                ...prevState,
                upvotedCount: prevState.upvotedCount - 1,
            }));
        } else {
            setIsAnimating(true);
            setPostDetail((prevState) => ({
                ...prevState,
                upvotedCount: prevState.upvotedCount + 1,
            }));
            storeUpVote(1);
            setTimeout(() => {
                setIsAnimating(false);
                setIsUpVoted(true);
            }, 1500); // 1.5秒後にカラフルな色から青に変わる
        }
    };

    const storeUpVote = (is_upvoted) => {
        if (token) {
            axiosClient
                .post(`/posts/${id}/upvote`, {
                    is_upvoted: !!is_upvoted,
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleDownVoteClick = () => {
        if (isUpVoted && !isDownVoted) {
            setPostDetail((prevState) => ({
                ...prevState,
                upvotedCount: prevState.upvotedCount - 1,
            }));
            storeUpVote(0);
            setIsUpVoted(false);
            setIsDownVoted(true);
        } else if (isDownVoted) {
            setIsDownVoted(false);
        } else {
            setIsDownVoted(true);
        }
    };

    useEffect(() => {
        if (token) {
            axiosClient
                .get("/user/id")
                .then((response) => {
                    console.log(response);
                    setUserId(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    useEffect(() => {
        if (token) {
            axiosClient
                .get(`/upvotes/check/${id}`)
                .then((response) => {
                    console.log(response);
                    response.data.isUpVoted && setIsUpVoted(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    useEffect(() => {
        axiosClient
            .get(`/post/${id}/detail`)
            .then((response) => {
                console.log(response);
                setPostDetail({
                    post: response.data.postDetails[0],
                    viewCounter: response.data.viewCounter,
                    upvotedCount: response.data.upVotedCount,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const onClickEditButton = () => {
        navigate(`/post/edit/${id}`);
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-12 mt-10">
                <div className="flex justify-between items-center">
                    <p className="text-3xl">{postDetail.post.title}</p>
                    {postDetail.post.user_id == userId && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                            onClick={onClickEditButton}
                        >
                            Edit
                        </button>
                    )}
                </div>
                <p>{postDetail?.viewCounter || 0} views</p>
                <div className="flex flex-row">
                    <div
                        onClick={handleUpVoteClick}
                        className={`cursor-pointer p-2 transform transition-transform 
                        ${isAnimating ? "animate-colorful scale-150" : ""}
                        ${isUpVoted ? "text-blue-500" : "text-gray-500"}
                    `}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                            />
                        </svg>
                    </div>
                    <div>{postDetail?.upvotedCount || 0}</div>
                    <div
                        onClick={handleDownVoteClick}
                        className={`cursor-pointer p-2 ${
                            isDownVoted ? "text-blue-500" : "text-gray-500"
                        }`}
                        style={{ transformOrigin: "center" }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                            />
                        </svg>
                    </div>
                </div>

                <ul className="flex my-5">
                    {postDetail.post.categories?.map((category) => (
                        <>
                            <li
                                className="mr-4 cursor-pointer bg-slate-200 text-stone-600 rounded-xl px-3"
                                key={category.id}
                                onClick={() => {
                                    onClickCategory(category.name);
                                }}
                            >
                                {category.name}
                            </li>
                        </>
                    ))}
                </ul>
                <p className="text-lg">{postDetail.post.body}</p>

                <CommentComponent
                    userId={userId}
                    setBody={setFormComment}
                    setCommentId={setCommentId}
                    // toggleEditing={toggleEditing}
                    editingCommentId={editingCommentId}
                    handleEditCommentId={handleEditCommentId}
                    comments={comments}
                />
                {token && (
                    <CommentForm
                        comment={formComment}
                        setComment={setFormComment}
                        commentId={commentId}
                        isEditing={editingCommentId !== null}
                        toggleEditing={toggleEditing}
                        fetchComments={fetchComments}
                        handleEditCommentId={handleEditCommentId}
                    ></CommentForm>
                )}
            </div>
        </>
    );
}
