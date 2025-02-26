import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const Sidenav = ({ isOpen, closeSidebar }) => {

    const { isAuthenticated } = useContext(AuthContext);

    const handleLinkClick = () => {
        if (closeSidebar) closeSidebar();
    };

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <aside id="sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform duration-300 ease-linear ${isOpen ? "translate-x-0" : "-translate-x-full"} bg-gray-200 border-r border-gray-200 sm:translate-x-0`} aria-label="sidebar">
                        <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-200">
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <Link to="/patients" onClick={handleLinkClick} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-300 group">
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                        </svg>
                                        <span className="flex-1 ms-3 text-sm whitespace-nowrap">Patient Management</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
