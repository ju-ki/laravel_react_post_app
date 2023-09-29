import { useState } from "react";
import axiosClient from "../axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function CommentForm({
    comment,
    setComment,
    commentId,
    isEditing,
    toggleEditing,
}) {
    const id = useParams();
    const [body, setBody] = useState("");
    const [updatedCommentId, setUpdatedCommentId] = useState("");

    useEffect(() => {
        setBody(comment);
        setUpdatedCommentId(commentId);
    }, [comment]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(id);
        const payload = {
            id: id["id"],
            body: body,
        };
        if (!isEditing) {
            axiosClient
                .post(`/comment/${id}`, payload)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            payload["commentId"] = updatedCommentId;
            axiosClient
                .patch(`/comment/${id}/update`, payload)
                .then((response) => {
                    console.log(response);
                    setComment(response.data.body);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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
                    <div className="flex justify-center space-x-4">
                        {isEditing && (
                            <button
                                className="h-12 px-10 mt-auto mb-0 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                type="button" // "submit"から"button"に変更して、実際のフォーム送信を避ける
                                onClick={toggleEditing} // 編集モードをトグル
                            >
                                キャンセル
                            </button>
                        )}
                        <button
                            className="h-12 px-10 mt-auto mb-0 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            type="submit"
                        >
                            送信
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
