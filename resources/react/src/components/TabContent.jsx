import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const TabContent = ({
    upvotedPosts,
    createdPosts,
    currentPage,
    setCurrentPage,
    handleNextPage,
    handlePrevPage,
}) => {
    const handleTabChange = (activeKey) => {
        setCurrentPage(1); // ページをリセット
        // 必要に応じて他の処理も追加できます
    };

    return (
        <Tabs defaultActiveKey="1" className="mt-8" onChange={handleTabChange}>
            <TabPane tab="過去に投稿したスレッド" key="1">
                <div className="space-y-12">
                    {Array.isArray(createdPosts.data) &&
                        createdPosts.data.map((post) => (
                            <NavLink key={post.id} to={`/post/${post.id}`}>
                                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
                                    <img
                                        className="w-12 h-12 mr-6"
                                        src={post.image}
                                    />
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-semibold">
                                            {post.title}
                                        </h3>
                                    </div>
                                    <div className="ml-6 flex-shrink-0 whitespace-nowrap">
                                        {post.days_ago}
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    <div className="flex justify-center space-x-4 mt-4">
                        {createdPosts.current_page > 1 && (
                            <button onClick={handlePrevPage}>前へ</button>
                        )}
                        <span>
                            {createdPosts.current_page}/{createdPosts.last_page}
                        </span>
                        {createdPosts.current_page < createdPosts.last_page && (
                            <button onClick={handleNextPage}>次へ</button>
                        )}
                    </div>
                </div>
            </TabPane>
            <TabPane tab="Upvoteしたスレッド" key="2">
                <div className="space-y-12">
                    {Array.isArray(upvotedPosts.data) &&
                        upvotedPosts.data.map((post) => (
                            <>
                                <NavLink key={post.id} to={`/post/${post.id}`}>
                                    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 flex justify-between">
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <img
                                                    className="w-12 h-12 mr-6"
                                                    src={post.image}
                                                />
                                                <div className="flex-grow">
                                                    <h3 className="text-xl font-semibold">
                                                        {post.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="mt-auto flex items-center">
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
                                                <div className="ms-3">
                                                    {post.total_likes}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-6 flex-shrink-0 whitespace-nowrap">
                                            {post.days_ago}
                                        </div>
                                    </div>
                                </NavLink>
                            </>
                        ))}
                    <div className="flex justify-center space-x-4 mt-4">
                        {upvotedPosts.current_page > 1 && (
                            <button onClick={handlePrevPage}>前へ</button>
                        )}
                        <span>
                            {upvotedPosts.current_page}/{upvotedPosts.last_page}
                        </span>
                        {upvotedPosts.current_page < upvotedPosts.last_page && (
                            <button onClick={handleNextPage}>次へ</button>
                        )}
                    </div>
                </div>
            </TabPane>
        </Tabs>
    );
};
export default TabContent;
