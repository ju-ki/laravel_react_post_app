import React from "react";
import { useEffect } from "react";
import axiosClient from "../axios";
import { useState } from "react";
import Header from "../components/Header";
import TabContent from "../components/TabContent";

export default function Profile() {
    const [profileData, setProfileData] = useState({
        user: {},
        upVotedPosts: [],
        createdPosts: [],
    });
    useEffect(() => {
        axiosClient
            .get("/users/profile-with-activities")
            .then((response) => {
                console.log("success");
                console.log(response);
                setProfileData(response.data);
            })
            .catch((err) => {
                console.log("エラー");
                console.log(err);
                return err;
            });
    }, []);

    return (
        <>
            <Header />
            <div className="text-center my-5 text-4xl">My Profile</div>
            <div className="flex justify-center items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-16 h-16 mx-2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <div className="text-2xl">{profileData.user.name}</div>
            </div>

            <nav className="my-20 flex justify-center">
                <TabContent
                    upvotedPosts={profileData.upVotedPosts}
                    createdPosts={profileData.createdPosts}
                />
            </nav>
        </>
    );
}
