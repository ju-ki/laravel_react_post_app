import Header from "../components/Header";
import CategorySelector from "../components/CategorySelector";
import PreviewImageComponent from "../components/PreviewImageComponent";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axiosClient
            .get(`/post/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setBody(response.data.body);
                setImage(response.data.image);
                setImageUrl(response.data.image_path);
                const categories = response.data["categories"].map(
                    (element) => ({
                        value: element["name"],
                        label: element["name"],
                    })
                );
                setCategories(categories);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false); // データの取得が完了したらloadingをfalseに設定
            });
    }, []);

    const handleImageChange = (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            title: title,
            body: body,
            image: image,
            categories: categories,
        };
        console.log(payload);
        axiosClient
            .post(`/post/edit/${id}`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response);
                navigate(`/post/${id}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onClickReturnButton = () => {
        navigate(`/post/${id}`);
    };

    return (
        <>
            <Header />
            <div className="mt-24 xl:mx-auto xl:w-full xl:max-w-xl mx-3 ">
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={onClickReturnButton}
                >
                    戻る
                </button>
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
                            setImage={image}
                            initialPreviewUrl={imageUrl}
                        />
                    </div>
                    <div>
                        <CategorySelector
                            setSelectedCategories={setCategories}
                            defaultValue={categories}
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
