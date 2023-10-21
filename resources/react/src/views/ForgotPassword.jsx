import { useState } from "react";
import Header from "../components/Header";
import axiosClient from "../axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        axiosClient
            .post("/password_forgot", {
                email: email,
            })
            .then((response) => {
                if (response.status == 200) {
                    alert("メールを送信しました。");
                    return;
                }
                if (response.response.status == 422) {
                    setError(response.response.data.message);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <>
            <Header />
            <div className="mt-10 text-center text-semibold text-lg">
                パスワードアシスタント
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    className="space-y-6"
                    action="#"
                    method="POST"
                    onSubmit={onSubmit}
                    noValidate
                >
                    <div>
                        {error != "" && (
                            <div className="my-5 text-red-600">{error}</div>
                        )}
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div className="mt-10">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            送信
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
