import { useState, useRef } from "react";
import PatientService from "../service/PatientService";
import { toastError, toastSuccess } from "../service/ToastService";
import { SelectSex } from "./SelectSex";
import { SelectSuffix } from "./SelectSuffix";
import { SelectCivilStatus } from "./SelectCivilStatus";
import { SelectBloodType } from "./SelectBloodType";

export const AddPatientForm = ({ closeAddModal }) => {

    const token = localStorage.getItem('token');
    const [patientData, setPatientData] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        suffix: '',
        sex: '',
        civilStatus: '',
        placeOfBirth: '',
        birthdate: '',
        address: '',
        bloodType: '',
        phoneNo: '',
        photoUrl: null,
        patientStatus: true,
        deleted: false
    });

    const [errors, setErrors] = useState({});
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;

        const formatDigits = (val, maxLength) => val.replace(/\D/g, '').slice(0, maxLength);
        const formattedValue = name === 'phoneNo' ? formatDigits(value, 12) : value;

        if (name === "photo") {
            setPhoto(e.target.files[0]);
            const file = e.target.files[0];
            if (file) {
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setPatientData((prevFormData) => {
                const updatedFormData = { ...prevFormData, [name]: formattedValue };
                setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

                return updatedFormData;
            });
        }
    };

    const fileInputRef = useRef(null);

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!patientData.lastName.trim()) { validationErrors.lastName = " *"; }
        if (!patientData.firstName.trim()) { validationErrors.firstName = " *"; }
        if (!patientData.middleName.trim()) { validationErrors.middleName = " *"; }
        if (!patientData.sex.trim()) { validationErrors.sex = " *"; }
        if (!patientData.placeOfBirth.trim()) { validationErrors.placeOfBirth = " *"; }
        if (!patientData.birthdate.trim()) { validationErrors.birthdate = " *"; }
        if (!patientData.address.trim()) { validationErrors.address = " *"; }
        if (!patientData.phoneNo.trim()) { validationErrors.phoneNo = " *"; }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const formData = new FormData();

                formData.append("patient", JSON.stringify(patientData));

                if (photo) {
                    formData.append("photo", photo);
                }

                const response = await PatientService.addPatient(formData, token);
                console.log(response);

                if (response.message && response.message !== "Saved Successfully") {
                    console.error("Error adding Patient", response.message);
                } else {
                    toastSuccess("Patient added successfully");
                    setPatientData({
                        lastName: '',
                        firstName: '',
                        middleName: '',
                        suffix: '',
                        sex: '',
                        civilStatus: '',
                        placeOfBirth: '',
                        birthdate: '',
                        address: '',
                        bloodType: '',
                        photoUrl: null,
                        patientStatus: true,
                        deleted: false
                    });
                    setPhoto(undefined);
                    setErrors({});
                    closeAddModal();
                }
            } catch (error) {
                console.log(error);
                toastError(error.message);
            }
        }
    };

    const handleRemovePicture = () => {
        setPhoto(null);
        setPreview(null);
        setPatientData(prevPatientData => ({
            ...prevPatientData,
            photoUrl: '',
        }));
        fileInputRef.current.value = null;
    };

    return (
        <div id="addModal" className="fixed inset-0 z-50 overflow-x-auto bg-gray-900 bg-opacity-50 px-2 py-2 mx-auto md:h-screen lg:py-0">
            <div className="relative lg:m-auto lg:my-8 sm:m-4 w-full max-w-5xl p-4 bg-gray-50 rounded-xl shadow-xl">
                <div className="mb-3 flex items-center justify-between bg-green-800 rounded-lg shadow-gray-500 shadow-md h-9">
                    <h3 className="text-start text-base text-gray-50 font-semibold flex-grow px-3">Add Patient</h3>
                    <button onClick={closeAddModal} type="button" className="text-gray-400 hover:text-gray-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="addModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmitAdd}>
                    <div className="grid place-items-center grid-cols-1 mb-2">
                        <div className="relative flex bg-gray-200 rounded-3xl shadow-lg shadow-gray-300 h-60 max-w-60 w-full justify-center items-center hover:cursor-pointer hover:ring-4 hover:ring-gray-200" onClick={handleFileInputClick}>
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-3xl" />
                            ) : (
                                <svg className="m-auto w-[48px] h-[48px] text-gray-300 hover:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clipRule="evenodd" />
                                </svg>
                            )}
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAddInputChange} name="photo" className="hidden" />
                            {preview && (
                                <button onClick={(event) => { event.stopPropagation(); handleRemovePicture(); }} type="button" className="absolute bottom-2 right-2 border-2 border-gray-300 hover:border-gray-200 bg-gray-600 hover:bg-gray-500 text-gray-50 text-xs font-medium rounded-full p-2 mt-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-300 hover:text-gray-200">
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="mb-1">
                            <label htmlFor="lastName" className={`block text-sm font-bold mb-2 ${errors.lastName ? 'text-red-500' : 'text-gray-700'}`}>
                                Last Name {errors.lastName && <span className="text-xs text-red-500 font-semibold">{errors.lastName}</span>}
                            </label>
                            <input type="text" value={patientData.lastName} onChange={handleAddInputChange} id="lastName" name="lastName" autoComplete="off"
                                className={`bg-gray-50 border border-gray-300 ${errors.lastName ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-200'} text-gray-600 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full py-1 px-2.5`} />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="firstName" className={`block text-sm font-bold mb-2 ${errors.firstName ? 'text-red-500' : 'text-gray-700'}`}>
                                First Name {errors.firstName && <span className="text-xs text-red-500 font-semibold">{errors.firstName}</span>}
                            </label>
                            <input type="text" value={patientData.firstName} onChange={handleAddInputChange} id="firstName" name="firstName" autoComplete="off"
                                className={`bg-gray-50 border-gray-300 ${errors.firstName ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-200'} text-gray-600 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full py-1 px-2.5`} />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="middleName" className={`block text-sm font-bold mb-2 ${errors.middleName ? 'text-red-500' : 'text-gray-700'}`}>
                                Middle Name {errors.middleName && <span className="text-xs text-red-500 font-semibold">{errors.middleName}</span>}
                            </label>
                            <input type="text" value={patientData.middleName} onChange={handleAddInputChange} id="middleName" name="middleName" autoComplete="off"
                                className={`bg-gray-50 border-gray-300 ${errors.middleName ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-200'} text-gray-600 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full py-1 px-2.5`} />
                        </div>
                        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-1">
                                <label htmlFor="suffix" className="block text-gray-700 text-sm font-bold mb-2">Suffix</label>
                                <SelectSuffix value={patientData.suffix} onChange={handleAddInputChange} error={errors.suffix} />
                            </div>
                            <div className="mb-1">
                                <label htmlFor="sex" className={`block text-sm font-bold mb-2 ${errors.sex ? 'text-red-500' : 'text-gray-700'}`}>
                                    Sex {errors.sex && <span className="text-xs text-red-500 font-semibold">{errors.sex}</span>}
                                </label>
                                <SelectSex value={patientData.sex} onChange={handleAddInputChange} error={errors.sex} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="mb-1">
                            <label htmlFor="civilStatus" className={`block text-sm font-bold mb-2 ${errors.civilStatus ? 'text-red-500' : 'text-gray-700'}`}>
                                Civil Status {errors.civilStatus && <span className="text-xs text-red-500 font-semibold">{errors.civilStatus}</span>}
                            </label>
                            <SelectCivilStatus value={patientData.civilStatus} onChange={handleAddInputChange} error={errors.civilStatus} />
                        </div>
                        <div className="mb-1 md:col-span-2">
                            <label htmlFor="placeOfBirth" className={`block text-sm font-bold mb-2 ${errors.placeOfBirth ? 'text-red-500' : 'text-gray-700'}`}>
                                Place of Birth {errors.placeOfBirth && <span placeOfBirth="text-xs text-red-500 font-semibold">{errors.placeOfBirth}</span>}
                            </label>
                            <input type="text" value={patientData.placeOfBirth} onChange={handleAddInputChange} id="placeOfBirth" name="placeOfBirth" autoComplete="off"
                                className={`bg-gray-50 border-gray-300 ${errors.placeOfBirth ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-200'} text-gray-600 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full py-1 px-2.5`} />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="mb-1">
                            <label htmlFor="birthdate" className={`block text-sm font-bold mb-2 ${errors.birthdate ? 'text-red-500' : 'text-gray-700'}`}>
                                Date of Birth {errors.birthdate && <span className="text-xs text-red-500 font-semibold">{errors.birthdate}</span>}
                            </label>
                            <input type="date" value={patientData.birthdate} onChange={handleAddInputChange} id="birthdate" name="birthdate" autoComplete="off"
                                className={`bg-gray-50 border-gray-300 ${errors.birthdate ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-200'} text-gray-600 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full py-1 px-2.5`} />
                        </div>
                        <div className="mb-1 md:col-span-2">
                            <label htmlFor="address" className={`block text-sm font-bold mb-2 ${errors.address ? 'text-red-500' : 'text-gray-700'}`}>
                                Address {errors.address && <span address="text-xs text-red-500 font-semibold">{errors.address}</span>}
                            </label>
                            <input type="text" value={patientData.address} onChange={handleAddInputChange} id="address" name="address" autoComplete="off"
                                className={`bg-gray-50 border-gray-300 ${errors.address ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-200'} text-gray-600 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full py-1 px-2.5`} />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="mb-1">
                            <label htmlFor="bloodType" className={`block text-sm font-bold mb-2 ${errors.bloodType ? 'text-red-500' : 'text-gray-700'}`}>
                                Blood Type {errors.bloodType && <span className="text-xs text-red-500 font-semibold">{errors.bloodType}</span>}
                            </label>
                            <SelectBloodType value={patientData.bloodType} onChange={handleAddInputChange} error={errors.bloodType} />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="phoneNo" className={`block text-sm font-bold mb-2 ${errors.phoneNo ? 'text-red-500' : 'text-gray-700'}`}>
                                Phone No. {errors.phoneNo && <span className="text-xs text-red-500 font-semibold">{errors.phoneNo}</span>}
                            </label>
                            <input type="text" value={patientData.phoneNo} onChange={handleAddInputChange} id="phoneNo" name="phoneNo" autoComplete="off"
                                className={`bg-gray-50 border-gray-300 ${errors.phoneNo ? 'border-red-500 outline outline-offset-0 outline-red-200' : 'border-gray-200'} text-gray-600 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full py-1 px-2.5`} />
                        </div>
                    </div>
                    <div className="flex items-center justify-start mt-6 space-x-5">
                        <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg focus:outline-none focus:shadow-outline w-28 h-8">Save</button>
                        <button type="button" onClick={closeAddModal} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-lg focus:outline-none focus:shadow-outline w-28 h-8">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
