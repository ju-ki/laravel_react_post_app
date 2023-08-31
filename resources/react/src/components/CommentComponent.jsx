import Echo from "laravel-echo";
import Pusher from "pusher-js";
window.Pusher = Pusher;
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import { useState } from "react";

export default function CommentComponent() {
    const { id } = useParams();
    const [comment, setComment] = useState([]);
    const echo = new Echo({
        broadcaster: "pusher",
        key: "114a4dd3c3e065085bf3",
        cluster: "ap3",
        encrypted: true,
    });

    useEffect(() => {
        echo.channel("comments").listen("CommentPostedEvent", (event) => {
            console.log(event);
            axiosClient
                .get(`/comment/${id}`)
                .then((response) => {
                    console.log(response);
                    setComment(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
        return () => {
            echo.disconnect();
        };
    });

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
                    <p>{elem.body}</p>
                    {/* <li key={elem.id}>{elem.body}</li> */}
                </>
            ))}
        </>
    );
}
