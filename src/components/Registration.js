import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from "../service/UserService";
import { toastSuccess, toastError } from "../service/ToastService";
import DOHbrand from "../assets/DOHbrand.png";
import bagongpinas from "../assets/bagongpinas.png";
import { ConfirmPrivacy, RegistrationAlert } from "../components";

export const Registration = () => {

    const navigate = useNavigate();
    const [isConfirmPrivacy, setIsConfirmPrivacy] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        roleName: 'ADMIN',
        userStatus: true
    });

    const [errors, setErrors] = useState({});
    const [passwordError, setPasswordError] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData, [name]: value };
            if (name === 'name' || name === 'email' || name === 'password' || name === 'confirmPassword') {
                setErrors('');
                if (updatedFormData.password !== updatedFormData.confirmPassword && updatedFormData.confirmPassword !== '' && updatedFormData.password !== '') {
                    setPasswordError(true);
                } else {
                    setPasswordError(false);
                }
            }
            return updatedFormData;
        });
    };

    const validateForm = () => {
        const validationErrors = {};
        if (!formData.name.trim()) validationErrors.name = " is required";
        if (!formData.email.trim()) validationErrors.email = " is required";
        if (!formData.password.trim()) validationErrors.password = " is required";
        else if (formData.password.length < 8) validationErrors.password = "- (Password should be at least 8 characters)";
        if (formData.confirmPassword !== formData.password) validationErrors.confirmPassword = "- (Passwords do not match)";
        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await UserService.register({ email: formData.email });

            if (response && response.message === "Email is already in use") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "is already in use",
                }));
                return;
            }

            setIsConfirmPrivacy(true);

        } catch (error) {
            console.error("Registration failed:", error);
            toastError("Registration failed. Please try again.");
        }
    };

    const handleConfirmPrivacy = async () => {
        try {
            const response = await UserService.register(formData);
            console.log(response);

            toastSuccess("Registration successful");

            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                roleName: 'ADMIN',
                userStatus: true
            });

            setIsConfirmPrivacy(false);
            setIsModalOpen(true);

        } catch (error) {
            console.error("Error finalizing registration:", error);
            setIsConfirmPrivacy(false);
            toastError("Error confirming privacy. Please try again.");
        }
    };

    const closeConfirmPrivacy = () => {
        setIsConfirmPrivacy(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate("/login");
    };

    return (
        <main>
            <section className="bg-gray-200 h-auto md:h-auto">
                <div className="flex flex-col items-center justify-start min-h-screen px-8 py-14">
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
                                Create an account
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                <div className="mb-4">
                                    <label htmlFor="name" className={`block text-sm font-bold mb-2 ${errors.name ? 'text-red-500' : 'text-gray-700'}`}>
                                        Name {errors.name && <span className="text-xs text-red-500 font-semibold">{errors.name}</span>}
                                    </label>
                                    <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name"
                                        className={`bg-gray-50 border border-gray-300 ${errors.name ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-200'} text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full py-1 px-2.5`} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className={`block text-sm font-bold mb-2 ${errors.email ? 'text-red-500' : 'text-gray-700'}`}>
                                        Email {errors.email && <span className="text-xs text-red-500 font-semibold">{errors.email}</span>}
                                    </label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email"
                                        className={`bg-gray-50 border border-gray-300 ${errors.email ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-200'} text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full py-1 px-2.5`} />
                                </div >
                                <div className="mb-4">
                                    <label htmlFor="password" className={`block text-sm font-bold mb-2 ${errors.password ? 'text-red-500' : 'text-gray-700'}`}>
                                        Set Password {errors.password && <span className="text-xs text-red-500 font-semibold">{errors.password}</span>}
                                    </label>
                                    <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••"
                                        className={`bg-gray-50 border border-gray-300 ${errors.password ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-200'} text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full py-1 px-2.5`} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className={`block text-sm font-bold mb-2 ${errors.confirmPassword ? 'text-red-500' : 'text-gray-700'}`}>
                                        Confirm Password {errors.confirmPassword && <span className="text-xs text-red-500 font-semibold">{errors.confirmPassword}</span>}
                                    </label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••"
                                        className={`bg-gray-50 border border-gray-300 ${errors.confirmPassword || passwordError ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-200'} text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full py-1 px-2.5`} />

                                </div>
                                <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Register</button>
                                <p className="text-sm font-normal text-gray-500">
                                    Already have an account? <Link to="/login" className="font-medium text-green-900 hover:underline"> Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ConfirmPrivacy closeModal={closeConfirmPrivacy} openModal={isConfirmPrivacy} onConfirm={handleConfirmPrivacy} />
            <RegistrationAlert openModal={isModalOpen} closeModal={closeModal} />
        </main>
    )
}
