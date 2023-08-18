import React from "react";
import { useState } from "react";

export default function PreviewImageComponent(props) {
    const label = props.label || "画像を選択してください";
    const labelClassName =
        props.labelClassName ||
        "bg-gray-200 text-gray-700 text-sm font-bold py-2 px-4 rounded";
    const imageClassName = props.imageClassName || "w-48";
    const accept = props.accept || "image/jpeg,image/png";
    const [imageData, setImageData] = useState(null);

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            console.log(file);
            const render = new FileReader();
            // setImageData(file["name"]);
            render.onload = (e) => {
                const imageData = e.target.result;
                setImageData(imageData);
                handleImageChange({
                    status: "add",
                    file: file,
                    imageData: imageData,
                });
            };
            render.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => {
        if (confirm("画像を削除しますか?")) {
            setImageData(null);
            handleImageChange({
                status: "removed",
                file: null,
                imageData: null,
            });
        }
    };

    const handleImageChange = (e) => {
        if (typeof props.onImageChange === "function") {
            props.onImageChange(e);
        }

        if (e.status === "add") {
            console.log("追加されました");
            console.log(e.file);
            // setImageData(e.file);
        }
    };
    return (
        <>
            <label className={labelClassName}>
                {label}
                <input
                    type="file"
                    accept={accept}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e)}
                />
            </label>
            {imageData && (
                <div className="mt-5">
                    <img src={imageData} className={imageClassName} />
                    <button
                        type="button"
                        className="bg-red-500 text-gray-100 text-sm font-bold py-1 px-3 rounded mt-3"
                        onClick={(e) => handleImageDelete(e)}
                    >
                        削除
                    </button>
                </div>
            )}
        </>
    );
}
