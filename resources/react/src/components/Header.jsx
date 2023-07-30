import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStateContext } from "../context/AuthContext";
import axiosClient from "../axios";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { setToken, setCurrentUser } = useAuthStateContext();
    const { token } = useAuthStateContext();
    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault();
        axiosClient
            .post("/logout")
            .then((response) => {
                if (response.data.success) {
                    setToken(null);
                    setCurrentUser({});
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log("エラー");
                console.log(err);
            });
    };

    return (
        <>
            <header className="bg-slate-200">
                <nav
                    className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="text-2xl">
                        <NavLink to={"/"}>Laravel Post</NavLink>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a
                            href="#"
                            className="mx-4 text-sm font-semibold leading-6 text-gray-900"
                        >
                            {token ? (
                                <>
                                    <NavLink to={"/create"} className="mx-3">
                                        投稿する
                                    </NavLink>
                                    <NavLink onClick={(event) => logout(event)}>
                                        Logout
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink to={"/signup"}>
                                        Sign Up{" "}
                                        <span aria-hidden="true">&rarr;</span>
                                    </NavLink>
                                    <NavLink to={"/login"} className="mx-3">
                                        Login{" "}
                                        <span aria-hidden="true">&rarr;</span>
                                    </NavLink>
                                </>
                            )}
                        </a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 mx-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 mx-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                </nav>
                <Dialog
                    as="div"
                    className="lg:hidden"
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                >
                    <div className="fixed inset-0 z-10" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </Dialog.Panel>
                </Dialog>
                <Outlet />
            </header>
        </>
    );
}
