import { Tabs } from "antd";
const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: "1",
        label: `過去に投稿したスレッド`,
        children: `ここに投稿した記事一覧`,
    },
    {
        key: "2",
        label: `Upvoteしたスレッド`,
        children: `ここにupvoteした記事一覧`,
    },
];

const TabContent = () => (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);
export default TabContent;
