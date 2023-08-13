import React from "react";
import Header from "../components/Header";
import axiosClient from "../axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
export default function PostView() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [categories, setCategories] = useState([]);
    const [dayAgo, setDayAgo] = useState("");
    useEffect(() => {
        axiosClient
            .get(`/post/${id}`)
            .then((response) => {
                console.log(response);
                setTitle(response.data.title);
                setBody(response.data.body);
                setCategories(response.data.categories);
                setDayAgo(response.data.day_ago);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto px-12 mt-10">
                <p className="text-6xl">{title}</p>
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
            </div>
        </>
    );
}
