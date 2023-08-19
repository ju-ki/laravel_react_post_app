import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axiosClient from "../axios";

export default function CategorySelector(props) {
    const [options, setOptions] = useState([]); // useStateを使用してオプションの状態を管理します
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get("/category")
            .then((response) => {
                const categories = response.data.map((element) => ({
                    value: element["name"],
                    label: element["name"],
                }));

                // 重複するカテゴリをフィルタリングする
                const uniqueCategories = categories.filter(
                    (cat, index, self) =>
                        index ===
                        self.findIndex(
                            (t) =>
                                t.label === cat.label && t.value === cat.value
                        )
                );

                setOptions(uniqueCategories); // setOptionsを使用して状態を更新します
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false); // データの取得が完了したらloadingをfalseに設定
            });
    }, []);

    const handleSelectorChange = (selected) => {
        props.setSelectedCategories(selected || []);
    };

    if (loading) return null;
    return (
        <CreatableSelect
            defaultValue={props.defaultValue} // options[0] を defaultValue として使用します
            isMulti
            options={options} // optionsを使用して状態を渡します
            onChange={handleSelectorChange}
        />
    );
}
