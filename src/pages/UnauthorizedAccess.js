import { Link } from "react-router-dom";
import { Button } from "../components";

export const UnauthorizedAccess = () => {
    return (
        <main>
            <section className="flex flex-col justify-center px-2">
                <div className="flex flex-col items-center my-4">
                    <p className="text-3xl text-gray-700 font-bold my-10">401, Unathorized Access!</p>
                    <div className="max-w-lg">
                    </div>
                </div>
                <div className="flex justify-center my-4">
                    <Link to="/">
                        <Button>Please Login!</Button>
                    </Link>
                </div>
            </section>
        </main>
    )
}
