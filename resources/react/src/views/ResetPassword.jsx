import { useState } from "react";
import axiosClient from "../axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const token = query.get("token");
    const email = query.get("email");

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            password: password,
            password_confirmation: passwordConfirmation,
            email: email,
            token: token,
        };
        setError("");
        axiosClient
            .post("/reset_password", payload)
            .then((response) => {
                if (response.status == 200) {
                    alert("パスワードの更新が完了しました");
                    navigate("/login");
                }

                if (
                    response.response.status == 422 ||
                    response.response.status == 500
                ) {
                    setError(response.response.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className="mt-10 text-center text-bold text-lg">
                パスワード変更
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
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            新しいパスワード
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="passwordConfirmation"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            確認用のパスワード
                        </label>
                        <input
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            onChange={(event) => {
                                setPasswordConfirmation(event.target.value);
                            }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div className="mt-10">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            パスワード更新
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
