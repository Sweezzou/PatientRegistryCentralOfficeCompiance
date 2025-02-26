import React from 'react'
import { toastError, toastSuccess, toastWarning } from "../service/ToastService";
import PatientService from '../service/PatientService';

export const ConfirmDelete = ({ selectedPatId, closeDeleteModal, isDeleted }) => {

    const token = localStorage.getItem('token');

    const updatedPatientData = {
        deleted: !isDeleted
    };

    const handleConfirmDelete = async (e) => {
        try {
            e.preventDefault();

            await PatientService.updatePatientDeleted(selectedPatId, updatedPatientData, token);
            if (isDeleted) {
                toastSuccess("Patient restored successfully");
            }
            else {
                toastWarning("Patient deleted successfully");
            }
            closeDeleteModal();
        } catch (error) {
            toastError("Error updating patient: " + error.message);
        } finally {
        }
    };

    return (
        <div id="popup-modal" tabIndex="-1" className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-65 px-6 py-8 mx-auto md:h-screen lg:py-0 overflow-y-auto overflow-x-hidden`}>
            <div className="relative w-full max-w-lg p-6 bg-white rounded-2xl">
                <div className="relative bg-white rounded-2xl">
                    <form onSubmit={handleConfirmDelete}>
                        <div className="p-2 md:p-5 text-center">
                            <div className="mb-5 mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                                <svg className={`h-7 w-7 ${isDeleted ? 'text-green-600 ' : 'text-red-600 '}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="mb-5 text-lg font-normal text-gray-500">{isDeleted ? 'Confirm Restore!' : 'Confirm Delete!'}</h3>
                            <h3 className="mb-5 text-md font-medium text-gray-500 whitespace-nowrap">Are you sure you want to {isDeleted ? 'restore' : 'delete'} this record?</h3>
                            <div className="flex justify-center">
                                <button data-modal-hide="popup-modal" type="button" onClick={closeDeleteModal} className="text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none font-medium rounded-lg text-lg inline-flex items-center justify-center px-6 py-2 text-center mr-3 w-28 h-10">
                                    Cancel
                                </button>
                                <button data-modal-hide="popup-modal" type="submit" onClick={handleConfirmDelete} className={`text-white ${isDeleted ? 'bg-green-700 hover:bg-green-800 ' : 'bg-red-700 hover:bg-red-800 '}  focus:outline-none font-medium rounded-lg text-lg inline-flex items-center justify-center px-6 py-2 text-center ml-3 w-28 h-10`}>
                                    {isDeleted ? 'Restore' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}
