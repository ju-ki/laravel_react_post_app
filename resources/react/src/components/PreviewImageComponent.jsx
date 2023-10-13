import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function PreviewImageComponent(props) {
    const label = props.label || "画像を選択してください";
    const labelClassName =
        props.labelClassName ||
        "bg-gray-200 text-gray-700 text-sm font-bold py-2 px-4 rounded";
    const imageInputRef = useRef(null);
    const accept = props.accept || "image/jpeg,image/png";
    const [preview, setPreview] = useState(props.initialPreviewUrl);
    const [image, setImage] = useState("");

    useEffect(() => {
        setPreview(props.initialPreviewUrl);
    }, [props.initialPreviewUrl]);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setImage(file);
        }
        if (typeof props.onImageChange === "function") {
            props.onImageChange(file);
        }
    };

    const handleImageDelete = () => {
        if (confirm("画像を削除しますか?")) {
            setImage("");
            setPreview(null);
            imageInputRef.current.value = null;
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
                    onChange={(e) => onFileChange(e)}
                    ref={imageInputRef}
                />
            </label>
            {preview && (
                <img className="my-6" src={preview} alt="Preview" width="200" />
            )}
            {image && (
                <button
                    type="button"
                    className="bg-red-500 text-gray-100 text-sm font-bold py-1 px-3 rounded mt-3"
                    onClick={(e) => handleImageDelete(e)}
                >
                    削除
                </button>
            )}
        </>
    );
}
