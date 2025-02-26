import React from 'react'
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const Home = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <main>
            <section>
                <div>
                    {isAuthenticated ? (
                        <>
                            Home
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </section>
        </main>
    )
}
