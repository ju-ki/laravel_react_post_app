import { useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStateContext } from "../context/AuthContext";
import axiosClient from "../axios";
import { useEffect } from "react";

export default function Header() {
    const [searchParam] = useSearchParams();
    const query = searchParam.get("q");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { setToken, setCurrentUser } = useAuthStateContext();
    const [searchWord, setSearchWord] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const { token } = useAuthStateContext();
    const navigate = useNavigate();

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsDropdownVisible(false); // 画面遷移ごとにドロップボックスを閉じる
    }, [location]);

    // ボタンクリックのハンドラ
    const toggleDropdown = () => {
        setIsDropdownVisible((prevState) => !prevState);
    };

    useEffect(() => {
        axiosClient
            .get("/category")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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

    useEffect(() => {
        setSearchWord(query);
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        if (!searchWord) {
            navigate(`/search?all`);
        } else {
            navigate(`/search?q=${searchWord}`);
        }
    };

    const onClickCategory = (currentCategory) => {
        setSelectedCategory(currentCategory);
        navigate(`/search?cat=${currentCategory}`);
    };

    return (
        <>
            <header className="bg-slate-200">
                <nav
                    className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                    aria-label="Global"
                >
                    <div className="text-2xl ml-4">
                        <NavLink to={"/"}>Laravel Post</NavLink>
                    </div>
                    <form
                        className="flex justify-center flex-grow"
                        onSubmit={onSubmit}
                        action="search"
                    >
                        <div className="flex items-center">
                            <div>
                                <label
                                    htmlFor="search-dropdown"
                                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                >
                                    Your Email
                                </label>
                                <div className="relative">
                                    <button
                                        id="dropdown-button"
                                        data-dropdown-toggle="dropdown"
                                        className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                                        type="button"
                                        onClick={toggleDropdown}
                                    >
                                        All Categories
                                        <svg
                                            className="w-2.5 h-2.5 ml-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                    {isDropdownVisible && (
                                        <div
                                            id="dropdown"
                                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto"
                                        >
                                            <div
                                                className="py-1"
                                                role="menu"
                                                aria-orientation="vertical"
                                                aria-labelledby="options-menu"
                                            >
                                                <ul className="divide-y divide-gray-200">
                                                    {categories.length > 0 &&
                                                        categories.map(
                                                            (category) => (
                                                                <li
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    onClick={() =>
                                                                        onClickCategory(
                                                                            category.name
                                                                        )
                                                                    }
                                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="relative flex-grow">
                                <input
                                    type="search"
                                    id="search-dropdown"
                                    value={searchWord}
                                    onChange={(event) =>
                                        setSearchWord(event.target.value)
                                    }
                                    className="block w-96 p-2.5 text-sm text-gray-700 bg-gray-50 rounded-r-none border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:border-blue-500"
                                    placeholder="Search Mockups, Logos, Design Templates..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="flex items-center px-4 py-3 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </form>

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
                        <NavLink to={"/profile"}>
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
                        </NavLink>
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
