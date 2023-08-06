import Header from "../components/Header";
import { useState } from "react";
import PreviewImageComponent from "../components/PreviewImageComponent";
import CategorySelector from "../components/CategorySelector";
import axiosClient from "../axios";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [errors, setErrors] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        console.log(selectedCategories);
        const payload = {
            title: title,
            body: body,
            image: image,
            categories: selectedCategories,
        };
        console.log(payload);

        axiosClient
            .post("/create", payload)
            .then((responses) => {
                console.log(responses);
                if (responses.response) {
                    const finalErrors = Object.values(
                        responses.response.data.errors
                    ).reduce((accum, next) => [...accum, ...next], []);
                    setErrors(finalErrors);
                    console.log(errors);
                }
                // console.log(responses);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleImageChange = (e) => {
        setImage(e.imageData);
    };

    return (
        <>
            <Header />

            <div className="mt-24 xl:mx-auto xl:w-full xl:max-w-xl mx-3 ">
                {errors.length ? (
                    <div className="bg-red-500 rounded py-2 px-3 text-white">
                        {errors.map((_error) => (
                            <li key={_error} className="list-none">
                                {_error}
                            </li>
                        ))}
                    </div>
                ) : (
                    "aaaa"
                )}
                <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            タイトル
                        </label>
                        <div className="mt-2">
                            <input
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="body"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                内容
                            </label>
                        </div>
                        <div className="mt-2">
                            <textarea
                                className="block w-full h-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div>
                        <PreviewImageComponent
                            onImageChange={(e) => handleImageChange(e)}
                        />
                    </div>
                    <div>
                        <CategorySelector
                            setSelectedCategories={setSelectedCategories}
                        />
                    </div>

                    <div className="py-12">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            作成
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
