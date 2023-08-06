import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axiosClient from "../axios";

const defaultOptions = [
    { value: "料理", label: "料理" },
    { value: "旅行", label: "旅行" },
    { value: "ゲーム", label: "ゲーム" },
];

// axiosClient.get("/")

export default function CategorySelector(props) {
    const handleSelectorChange = (selected) => {
        props.setSelectedCategories(selected || []);
    };

    return (
        <CreatableSelect
            isMulti
            options={defaultOptions}
            onChange={handleSelectorChange}
        />
    );
}
