import React from 'react'

export const Button = ({ children }) => {
    return (
        <button className="w-64 text-xl text-white bg-green-800 rounded-lg px-5 py-2.5 mr-2 mb-2 font-medium">{children}</button>
    )
}
