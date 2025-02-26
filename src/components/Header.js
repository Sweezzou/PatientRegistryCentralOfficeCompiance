import React from 'react'
import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../context";
import { useNavigate, Link } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import UserService from "../service/UserService";
import { toastSuccess } from "../service/ToastService";
import DOHbrand from "../assets/DOHbrand.png";
import userlogo from "../assets/userlogo.png";
import bagongpinas from "../assets/bagongpinas.png";
import { Sidenav } from "../components/Sidenav";
import { Logout } from "../components/Logout";

export const Header = () => {

    const token = localStorage.getItem('token');
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [profileInfo, setProfileInfo] = useState({});
    const [showLogout, setShowLogout] = useState(false);
    const dropdownRef = useRef(null);
    const [isUserOpen, setIsUserOpen] = useState(false);

    const { profilePhoto } = useProfile();

    const handleLogout = () => {
        UserService.logout();
        setIsAuthenticated(false);
        setShowLogout(false);
        navigate('/login');
        toastSuccess("You have been logged out.");
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    useEffect(() => {
        fetchProfileInfo();
        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.addEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [imageUrl, setImageUrl] = useState(profilePhoto || userlogo);

    useEffect(() => {
        if (profilePhoto) {
            setImageUrl(profilePhoto);
        }
    }, [profilePhoto]);

    const fetchProfileInfo = async () => {
        if (!token) {
            console.warn('No active user session detected.');
            return;
        }
        try {
            const response = await UserService.getYourProfile(token);
            const user = response.users;
            setProfileInfo(user);
            setImageUrl(userlogo);
        } catch (error) {
            console.error('Error fetching profile information:', error);
            setImageUrl(userlogo);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchProfileInfo();
        }
    }, [isAuthenticated]);

    const handleResize = () => {
        if (window.innerWidth >= 640) {
            setIsSidebarOpen(false);
        }
    };

    const toggleUser = () => {
        setIsUserOpen(prev => !prev);
    };

    const openLogoutModal = () => {
        setShowLogout(true);
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsUserOpen(false);
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <nav className="fixed top-0 z-50 w-full bg-green-900 border-green-900">
                        <div className="px-3 py-3 lg:px-5 lg:pl-3">
                            <div className="flex items-center justify-between" ref={dropdownRef}>
                                <div className="flex items-center justify-start rtl:justify-end">
                                    <button onClick={toggleSidebar} aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-200 rounded-lg sm:hidden hover:bg-green-800">
                                        <span className="sr-only">Open sidebar</span>
                                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                        </svg>
                                    </button>
                                    <Link to="/home" className="flex ms-2 md:me-24">
                                        <img src={DOHbrand} className="h-12 me-3" alt="Logo" />
                                        <img src={bagongpinas} className="h-12 me-5" alt="Logo" />
                                        <div className="absolute">
                                            <p className="hidden md:block text-sm text-white font-semibold whitespace-nowrap ml-32 -mt-2">{'Department of Health'}</p>
                                            <p className="hidden md:block text-xl text-white font-semibold whitespace-nowrap ml-32 -mt-1">{'Western Visayas'} {'Center for Health Development'}</p>
                                            <p className="lg:hidden md:hidden text-base text-white font-semibold whitespace-nowrap ml-32">{'DOH WV CHD'}</p>
                                            <p className="hidden md:block text-xs text-white font-semibold sm:text-xs whitespace-nowrap ml-32">Patient Registry</p>
                                            <p className="lg:hidden md:hidden text-xs text-white font-semibold sm:text-xs whitespace-nowrap ml-32">Patient Registry</p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="relative flex items-center">
                                    <span className="hidden md:inline text-sm font-semibold text-gray-50 mr-3">Hi, {profileInfo.name}</span>
                                    <button onClick={toggleUser} type="button" className="flex text-sm bg-gray-800 rounded-full hover:ring-4 hover:ring-gray-500 mr-4" aria-expanded="false">
                                        <img className="w-10 h-10 rounded-full" src={imageUrl} alt="userLogo" />
                                    </button>
                                    <div className={`z-20 transition-all duration-300 transform ${isUserOpen ? '-translate-x-1' : 'translate-x-72'} absolute shadow-xl right-0 mt-64 mr-1 w-64 text-base list-none backdrop-blur-xl bg-white/20 divide-y divide-gray-100 rounded-xl`} id="dropdown-user">
                                        <div className="px-4 py-2" role="none">
                                            <p className="mb-2 text-md font-medium text-gray-900 truncate" role="none">{profileInfo.name}</p>
                                            <p className="mb-2 text-xs font-medium text-gray-900 truncate italic" role="none">{profileInfo.email}</p>
                                            <p className="mb-2 text-xs font-medium text-gray-900 truncate" role="none">User Level: {profileInfo.role?.roleName}</p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <button onClick={openLogoutModal} className="block px-4 py-2 w-full text-left text-sm hover:font-semibold text-gray-900 rounded-lg" role="menuitem">Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <Logout openLogout={showLogout} closeLogout={() => setShowLogout(false)} onLogout={handleLogout} />
                    <Sidenav isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
                    {isSidebarOpen && (
                        <>
                            <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={toggleSidebar}></div>
                        </>
                    )}
                </>
            ) : null}
        </div>
    )
}
