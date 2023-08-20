import Header from "../components/Header";
import axiosClient from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import CommentForm from "../components/CommentForm";
import CommentComponent from "../components/CommentComponent";
export default function PostView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [categories, setCategories] = useState([]);
    const [dayAgo, setDayAgo] = useState("");
    useEffect(() => {
        axiosClient
            .get(`/post/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setBody(response.data.body);
                setCategories(response.data.categories);
                setDayAgo(response.data.day_ago);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onClickEditButton = () => {
        navigate(`/post/edit/${id}`);
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-12 mt-10">
                <div className="flex justify-between items-center">
                    <p className="text-6xl">{title}</p>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                        onClick={onClickEditButton}
                    >
                        Edit
                    </button>
                </div>
                <p className="mt-5">{dayAgo}</p>
                <ul className="flex mt-5">
                    {categories.map((category) => (
                        <>
                            <li
                                className="mr-4 bg-slate-200 text-stone-600 rounded-xl px-3"
                                key={category.id}
                            >
                                {category.name}
                            </li>
                        </>
                    ))}
                </ul>

                <div className="mt-5 p-5 border">
                    <p>{body}</p>
                </div>

                <div className="mt-5 p-5 border">
                    <p>{body}</p>
                </div>
                <div className="mt-5 p-5 border">
                    <p>{body}</p>
                </div>
                <div className="mt-5 p-5 border">
                    <p>{body}</p>
                </div>
                <div className="mt-5 p-5 border">
                    <p>{body}</p>
                </div>
                <div className="mt-5 p-5 border">
                    <p>{body}</p>
                </div>
                <div className="mt-5 p-5 border">
                    <p>{body}</p>
                </div>
                <CommentComponent />
                <div className="mt-5 p-5 border mb-40">
                    <p>{body}</p>
                </div>
                <CommentForm></CommentForm>
            </div>
        </>
    );
}
