import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { NavLink } from "react-router-dom";

const TabContent = ({ upvotedPosts, createdPosts }) => (
    <Tabs defaultActiveKey="1" className="mt-8">
        <TabPane tab="過去に投稿したスレッド" key="1">
            <div className="space-y-12">
                {createdPosts.map((post) => (
                    <>
                        <NavLink to={`/post/${post.id}`}>
                            <div
                                key={post.id}
                                className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-semibold">
                                    {post.title}
                                </h3>
                                {/* 任意: 他の情報や画像、説明などをこちらに追加できます */}
                                <p className="text-gray-500 mt-2">
                                    {post.description}
                                </p>
                            </div>
                        </NavLink>
                    </>
                ))}
            </div>
        </TabPane>
        <TabPane tab="Upvoteしたスレッド" key="2">
            <div className="space-y-6">
                {upvotedPosts.map((post) => (
                    <>
                        <NavLink to={`/post/${post.id}`} className="my-12">
                            <div
                                key={post.id}
                                className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-semibold">
                                    {post.title}
                                </h3>
                                {/* 任意: 他の情報や画像、説明などをこちらに追加できます */}
                                <p className="text-gray-500 mt-2">
                                    {post.description}
                                </p>
                            </div>
                        </NavLink>
                    </>
                ))}
            </div>
        </TabPane>
    </Tabs>
);
export default TabContent;
