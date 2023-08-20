import React from "react";
import { useState } from "react";
import axiosClient from "../axios";
import { useParams } from "react-router-dom";

export default function CommentForm() {
    const id = useParams();
    const [body, setBody] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(id);
        const payload = {
            id: id["id"],
            body: body,
        };
        console.log(payload);
        axiosClient
            .post(`/comment/${id}`, payload)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <form
                className="fixed bottom-0 w-full bg-white z-10 p-2 shadow-md"
                method="POST"
                onSubmit={onSubmit}
            >
                <div className="flex">
                    <textarea
                        className="w-2/3 me-4 h-36 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    <button
                        className="h-12 px-10 mt-auto mb-0 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        type="submit"
                    >
                        送信
                    </button>
                </div>
            </form>
        </>
    );
}
