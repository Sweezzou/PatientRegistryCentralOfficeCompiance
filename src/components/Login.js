import React from 'react'
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import UserService from '../service/UserService'
import { toastError } from "../service/ToastService"
import DOHbrand from "../assets/DOHbrand.png"
import bagongpinas from "../assets/bagongpinas.png"

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleInputEmail = (e) => {
        setEmail(e.target.value);
        if (errors.email || errors.server) {
            setErrors((prevErrors) => ({ ...prevErrors, email: '', server: '' }));
        }
    };

    const handleInputPassword = (e) => {
        setPassword(e.target.value);
        if (errors.password || errors.server) {
            setErrors((prevErrors) => ({ ...prevErrors, password: '', server: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!email.trim()) validationErrors.email = "is required!";
        if (!password.trim()) validationErrors.password = "is required!";

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const userData = await UserService.login(email, password);
                if (userData.token) {
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('role', userData.roleName);
                    login(userData.token);
                    navigate("/patients");
                } else {
                    handleServerError(userData.message);
                }
            } catch (error) {
                handleServerError(error.message);
            }
        }
    };

    const handleServerError = (message) => {
        const errorMessage = message === "User account is not active"
            ? "User is not active! Contact your Administrator."
            : message === "No value present" || message === "Bad credentials"
                ? "Invalid login details!"
                : message;

        setErrors({ server: errorMessage });
        toastError("Login Failed!");
    };

    return (
        <main>
            <section className="bg-gray-200 h-auto md:h-auto">
                <div className="bg-gray-200 flex flex-col items-center justify-start min-h-screen px-8 py-24">
                    <Link className="flex items-center mb-1 text-2xl font-bold text-green-900">
                        <img className="w-12 h-12 mr-4" src={DOHbrand} alt="logo" />
                        <div className="text-center">
                            <div className="items-center text-sm">Department of Health</div>
                            <div className="items-center text-base">Western Visayas</div>
                            <div className="items-center text-sm">Center for Health Development</div>
                        </div>
                        <img className="w-15 h-14 ml-4" src={bagongpinas} alt="logo" />
                    </Link>
                    <span className="text-green-900 text-sm font-semibold mb-4 mt-4">Patient Registry</span>
                    <div className="w-full bg-white rounded-xl shadow-xl md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-green-900 md:text-2xl">
                                Login
                            </h1>
                            <p className="font-normal text-green-800 text-center">Sign in to your account</p>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className={`block mb-2 text-sm font-medium ${errors.email || errors.server ? 'text-red-500' : 'text-gray-900'}`}>
                                        Email {errors.email && <span className="text-xs text-red-500 font-semibold">{errors.email}</span>}
                                    </label>
                                    <input type="email" name="email" id="email" className={`bg-gray-50 border ${errors.email || errors.server ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-300'} ${errors.server ? 'text-red-500' : 'text-gray-900'} sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5`}
                                        value={email} onChange={handleInputEmail} placeholder="Enter your email" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className={`block mb-2 text-sm font-medium ${errors.password || errors.server ? 'text-red-500' : 'text-gray-900'}`}>
                                        Password {errors.password && <span className="text-xs text-red-500 font-semibold">{errors.password}</span>}
                                    </label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className={`bg-gray-50 border ${errors.password || errors.server ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5`}
                                        value={password} onChange={handleInputPassword} required="" />
                                </div>
                                <div className="items-center justify-between">
                                    {errors.server && <p className="text-sm text-center text-red-500 font-semibold">{errors.server}</p>}
                                </div>
                                <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Login</button>
                                <p className="text-sm font-normal text-gray-500">
                                    Don’t have an account yet? <Link to="/registration" className="font-medium text-green-900 hover:underline"> Please register!</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
