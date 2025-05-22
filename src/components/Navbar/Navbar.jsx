import React, { useContext, useState } from 'react';
import logo from '../../assets/images/favicon.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './../Context/AuthContext';
import { CartContext } from '../Context/CartContext';

export default function Navbar() {
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const{allCartItems,numOfCartItems} = useContext(CartContext)

    function logout() {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    }

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* logo part */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="FreshCart Logo" className="h-7" />
                        <span className="dark:text-white text-3xl font-semibold">FreshCart</span>
                    </Link>
                </div>

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {token ? (
                        <div className="flex gap-5 items-center">
                            <div className="relative">
                                <NavLink to="">
                                    <svg
                                        className="w-[40px] h-[40px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                        />
                                    </svg>
                                </NavLink>

                                {/* favs counter  */}
                                {/* <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    5
                                </span> */}
                            </div>


                            <div className="relative">
                                <NavLink to="/cart">
                                    <svg
                                        className="w-[40px] h-[40px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                                        />
                                    </svg>
                                </NavLink>

                                {/* cart counter */}
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {numOfCartItems}
                                </span>
                            </div>


                            {/* Dropdown Button */}
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6H6m12 4H6m12 4H6m12 4H6" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute top-16 right-4 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <button onClick={logout} className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Auth Nav Links 
                        <div className="flex gap-3">
                            <NavLink to="login" className={({ isActive }) => `block py-2 px-3 font-bold rounded-sm md:p-0 ${isActive ? "text-blue-700 font-bold" : "text-gray-900 hover:text-blue-700 md:hover:bg-transparent md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white"}`}>
                                Login
                            </NavLink>
                            <NavLink to="register" className={({ isActive }) => `block py-2 px-3 font-bold rounded-sm md:p-0 ${isActive ? "text-blue-700 font-bold" : "text-gray-900 hover:text-blue-700 md:hover:bg-transparent md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white"}`}>
                                Register
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Main Nav Links */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    {token && (
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li><NavLink to="/" className={({ isActive }) => `block py-2 px-3 rounded-sm md:p-0 ${isActive ? "text-blue-700 font-bold" : "text-gray-900 hover:text-blue-700 md:hover:bg-transparent md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white"}`}>Home</NavLink></li>
                            <li><NavLink to="/products" className={({ isActive }) => `block py-2 px-3 rounded-sm md:p-0 ${isActive ? "text-blue-700 font-bold" : "text-gray-900 hover:text-blue-700 md:hover:bg-transparent md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white"}`}>Products</NavLink></li>
                            <li><NavLink to="/categories" className={({ isActive }) => `block py-2 px-3 rounded-sm md:p-0 ${isActive ? "text-blue-700 font-bold" : "text-gray-900 hover:text-blue-700 md:hover:bg-transparent md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white"}`}>Categories</NavLink></li>
                            <li><NavLink to="/brands" className={({ isActive }) => `block py-2 px-3 rounded-sm md:p-0 ${isActive ? "text-blue-700 font-bold" : "text-gray-900 hover:text-blue-700 md:hover:bg-transparent md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white"}`}>Brands</NavLink></li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}
