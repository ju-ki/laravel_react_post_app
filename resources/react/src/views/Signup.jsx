import { useState } from "react";
import Header from "../components/Header";
import axiosClient from "../axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStateContext } from "../context/AuthContext";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Signup() {
    const { setCurrentUser, setToken, token, currentUser } =
        useAuthStateContext();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        setErrors([]);
        alert("submit");

        axiosClient
            .post("/signup", {
                name: userName,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            })
            .then((responses) => {
                console.log(responses);
                if (responses.response) {
                    const finalErrors = Object.values(
                        responses.response.data.errors
                    ).reduce((accum, next) => [...accum, ...next], []);
                    setErrors(finalErrors);
                } else {
                    setToken(responses.data.token);
                    setCurrentUser(responses.data.user);
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log("エラー");
                console.log(err);
                // console.error(error);
                // if (error.response) {
                //     console.log(error.response.data.errors);
                //     const finalErrors = Object.values(
                //         error.response.data.errors
                //     ).reduce((accum, next) => [...accum, ...next], []);
                //     console.log(finalErrors);
                //     setError({ __html: finalErrors.join("<br>") });
                // }
            });
    };

    return (
        <>
            <Header />
            {/*
            This example requires updating your template:
            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
            */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up for free
                    </h2>
                    <p className="text-center mt-5">
                        アカウントを持っている方はこちら
                        <NavLink to={"/login"} className="text-blue-500">
                            ログイン
                        </NavLink>
                    </p>
                    {errors.length ? (
                        <div className="bg-red-500 rounded py-2 px-3 text-white">
                            {errors.map((_error) => (
                                <li className="list-none">{_error}</li>
                            ))}
                        </div>
                    ) : (
                        ""
                    )}
                    {/* {errors.length && (
                        <div
                            className="bg-red-500 rounded py-2 px-3 text-white"
                            // dangerouslySetInnerHTML={{ __html: errors }}
                        >
                            {errors.map((_error) => _error)}
                        </div>
                    )} */}
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
                                htmlFor="userName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                User Name
                            </label>
                            <div className="">
                                <input
                                    id="user-name"
                                    name="user_name"
                                    type="text"
                                    value={userName}
                                    onChange={(event) =>
                                        setUserName(event.target.value)
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
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
                            </div>
                            <div className="">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
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
                                    Password Confirmation
                                </label>
                            </div>
                            <div className="">
                                <input
                                    id="password-confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    required
                                    value={passwordConfirmation}
                                    onChange={(event) =>
                                        setPasswordConfirmation(
                                            event.target.value
                                        )
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
