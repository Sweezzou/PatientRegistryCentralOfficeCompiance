import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import { Link } from 'react-router-dom';

export const Footer = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <footer className="fixed bottom-0 w-full h-12 bg-gray-100">
                        <div className="p-2 sm:ml-64">
                            <div className="w-full p-2">
                                <span className="block text-sm text-gray-600 text-center whitespace-nowrap">Copyright © 2024 <Link to="/home" className="text-sm text-green-800 font-bold hover:text-green-700">Department of Health</Link>.  All Rights Reserved.</span>
                            </div>
                        </div>
                    </footer>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
