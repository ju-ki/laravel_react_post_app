import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axiosClient from "../axios";
import axios from "axios";

export default function CategorySelector(props) {
    const defaultOptions = [];
    axiosClient
       .get("/category")
        .then((response) => {
            console.log(response);
            response.data.forEach((element) => {
                console.log(element);
                if (
                    !defaultOptions.includes({
                        value: element["name"],
                        label: element["name"],
                    })
                ) {
                    defaultOptions.push({
                        value: element["name"],
                        label: element["name"],
                    });
                }
            });
            console.log(defaultOptions);
        })
        .catch((err) => {
            console.log(err);
        });
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
