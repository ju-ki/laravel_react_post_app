import React from "react";
import axiosClient from "../axios";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
export default function PostView() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    useEffect(() => {
        axiosClient
            .get(`/post/${id}`)
            .then((response) => {
                console.log(response);
                setTitle(response.data.title);
                setBody(response.data.body);
                console.log(title);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto px-12">
                <p className="text-6xl">{title}</p>
                <p>{body}</p>
            </div>
        </>
    );
}
