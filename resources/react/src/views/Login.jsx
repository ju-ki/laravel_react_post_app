import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuthStateContext } from "../context/AuthContext";
import axiosClient from "../axios";

export default function Login() {
    const { setToken } = useAuthStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        setErrors([]);

        axiosClient
            .post("/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                setToken(response.data.token);
                navigate("/");
            })
            .catch((err) => {
                console.log("エラー");
                console.log(err);
            });
    };
    return (
        <>
            <Header />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="text-center mt-5">
                        アカウント作成がまだの方はこちらから
                        <NavLink to={"/signup"} className="text-blue-500">
                            {" "}
                            新規登録
                        </NavLink>
                    </p>
                    {errors.length ? (
                        <div className="bg-red-500 rounded py-2 px-3 text-white">
                            {errors.map((_error) => (
                                <li key="" className="list-none">
                                    {_error}
                                </li>
                            ))}
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="#"
                        method="POST"
                        onSubmit={onSubmit}
                    >
                        <input
                            type="hidden"
                            name="remember"
                            defaultValue="true"
                        />
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    autoComplete="email"
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <NavLink
                                        to={"/forgot_password"}
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot password?
                                    </NavLink>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    autoComplete="current-password"
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
