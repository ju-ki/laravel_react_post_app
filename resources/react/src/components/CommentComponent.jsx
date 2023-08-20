import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import { useState } from "react";

export default function CommentComponent() {
    const { id } = useParams();
    const [comment, setComment] = useState([]);
    useEffect(() => {
        axiosClient
            .get(`/comment/${id}`)
            .then((response) => {
                console.log(response);
                setComment(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <>
            {comment.map((elem) => (
                <>
                    <p>{elem.user.name}</p>
                    <li key={elem.id}>{elem.body}</li>
                </>
            ))}
        </>
    );
}
