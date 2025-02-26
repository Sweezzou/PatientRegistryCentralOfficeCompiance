import React from 'react'

export const RegistrationAlert = ({ openModal, closeModal }) => {
    return (
        <div id="popup-modal" tabIndex="-1" className={`${openModal ? '' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-55 px-6 py-8 mx-auto md:h-screen lg:py-0 overflow-y-auto overflow-x-hidden`}>
            <div className="relative w-full max-w-lg p-6 bg-white rounded-2xl">
                <div className="relative bg-white rounded-2xl">
                    <div className="p-2 md:p-5 text-center">
                        <div className="mb-5 mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-200">
                            <svg className="h-6 w-6 text-green-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">Registered successfully!</h3>
                        <h3 className="mb-5 text-md font-medium text-gray-500 whitespace-nowrap">You may now login using your new account.</h3>
                        <button data-modal-hide="popup-modal" type="button" onClick={closeModal} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-lg inline-flex items-center justify-center px-6 py-2 text-center w-28 h-10">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
