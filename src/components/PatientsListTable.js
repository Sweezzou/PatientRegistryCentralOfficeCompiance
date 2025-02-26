import React, { useCallback } from 'react'
import { useState, useEffect } from "react";
import PatientService from "../service/PatientService";
import { AddPatientForm } from './AddPatientForm';
import { EditPatientForm } from './EditPatientForm';
import { ConfirmDelete } from './ConfirmDelete';

export const PatientsListTable = () => {

    const token = localStorage.getItem('token');
    const [showAddPopover, setShowAddPopover] = useState(false);
    const [imageUrl, setImageUrl] = useState({});
    const [patients, setPatients] = useState([]);
    const [showDeleteRestore, setShowDeleteRestore] = useState(false);
    const [showDeleteRestoreTooltip, setShowDeleteRestoreTooltip] = useState(false);

    const formatDate = (date) => {
        if (!date) return '';
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return '';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('en-US', options).format(parsedDate);
    };

    const fetchPatients = useCallback(async () => {
        try {
            const response = await PatientService.getAllPatients(token);
            const patientsList = response.patientsList || [];

            const imageUrl = {};
            for (const patient of patientsList) {
                if (patient.photoUrl) {
                    imageUrl[patient.id] = await PatientService.getPatientPhoto(patient.photoUrl, token);
                }
            }
            setPatients(patientsList);
            setImageUrl(imageUrl);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    }, []);

    useEffect(() => {
        fetchPatients();
    }, [token], [fetchPatients]);

    const [search, setSearch] = useState("");

    const filteredPatients = showDeleteRestore ? patients.filter(patients =>
        patients.lastName.toLowerCase().includes(search.toLowerCase()) ||
        patients.firstName.toLowerCase().includes(search.toLowerCase()) ||
        patients.middleName.toLowerCase().includes(search.toLowerCase()) ||
        patients.sex.toLowerCase().includes(search.toLowerCase()) ||
        formatDate(patients.birthdate).toLowerCase().includes(search.toLowerCase()) ||
        patients.address.toLowerCase().includes(search.toLowerCase())
    ) : patients.filter(patients => 
        !patients.deleted && (patients.lastName.toLowerCase().includes(search.toLowerCase()) ||
        patients.firstName.toLowerCase().includes(search.toLowerCase()) ||
        patients.middleName.toLowerCase().includes(search.toLowerCase()) ||
        patients.sex.toLowerCase().includes(search.toLowerCase()) ||
        formatDate(patients.birthdate).toLowerCase().includes(search.toLowerCase()) ||
        patients.address.toLowerCase().includes(search.toLowerCase()))
    );

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = (currentPage - 1) * recordsPerPage;

    const records = filteredPatients.slice(firstIndex, lastIndex);

    const totalPatientEntries = filteredPatients.length;

    const npage = Math.ceil(totalPatientEntries / recordsPerPage);

    const pagesPerGroup = 6;
    const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
    const startPage = currentGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, npage);
    const lastIndexDisplay = totalPatientEntries === 0 ? 0 : Math.min(lastIndex, totalPatientEntries);
    const firstIndexDisplay = totalPatientEntries === 0 ? 0 : firstIndex + 1;

    const numbers = [...Array(endPage - startPage + 1).keys()].map(i => startPage + i);

    const [order, setOrder] = useState("ASC");
    const sorting = (col) => {
        const getValue = (patient, col) => {
            if (col.includes(".")) {
                const keys = col.split(".");
                return keys.reduce((obj, key) => (obj ? obj[key] : null), patient);
            }
            return patient[col];
        };

        const compareValues = (a, b) => {
            const aValue = getValue(a, col)?.toString().toLowerCase() || "";
            const bValue = getValue(b, col)?.toString().toLowerCase() || "";
            if (aValue === bValue) return 0;
            return aValue > bValue ? 1 : -1;
        };

        const sorted = [...patients].sort((a, b) => {
            return order === "ASC" ? compareValues(a, b) : compareValues(b, a);
        });

        setPatients(sorted);
        setOrder(order === "ASC" ? "DESC" : "ASC");
    };

    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };

    const changeCurrentPage = (id) => {
        setCurrentPage(id);
    };

    const nextPage = () => {
        if (currentPage !== npage) setCurrentPage(currentPage + 1);
    };

    const fPage = () => {
        if (startPage > 1) {
            const prevEndPage = startPage - 1;
            setCurrentPage(prevEndPage);
        } else {
            setCurrentPage(1);
        }
    };

    const lPage = () => {
        if (endPage < npage) {
            const nextStartPage = endPage + 1;
            setCurrentPage(nextStartPage);
        } else {
            setCurrentPage(npage);
        }
    };

    const [openAddModal, setOpenAddModal] = useState(false);
    const handleOpenAddModal = () => {
        setOpenAddModal(true);
    };

    const handleAddModalClose = () => {
        setOpenAddModal(false);
        fetchPatients();
    };

    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleOpenEditModal = (selectedPatId) => {
        setSelectedPatientId(selectedPatId);
        setOpenEditModal(true);
    };

    const handleEditModalClose = () => {
        setOpenEditModal(false);
        setSelectedPatientId(null);
        fetchPatients();
    };

    const handleOpenDeleteModal = (selectedPatId, isDeleted) => {
        setSelectedPatientId(selectedPatId);
        setIsDeleted(isDeleted);
        setOpenDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setOpenDeleteModal(false);
        setSelectedPatientId(null);
        fetchPatients();
    };

    return (
        <div className="flex flex-wrap h-auto mb-4 rounded-2xl bg-gray-200 shadow-lg shadow-gray-300">
            <input
                type="text"
                placeholder="Search patients..."
                className="w-full p-2 border rounded mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex items-center justify-between h-auto py-2 rounded-xl bg-green-800 m-2 px-1 w-full">
                <span className="text-xl text-white font-semibold sm:text-2xl whitespace-nowrap ml-2">Patients</span>
                <div className="flex items-center justify-between h-auto py-2">
                    <button type="button" onMouseEnter={() => { setShowAddPopover(true) }} onMouseLeave={() => setShowAddPopover(false)}
                        onClick={handleOpenAddModal} data-modal-target="addModal" data-modal-show="addModal" className="text-white bg-gray-200 focus:outline-none focus:ring-0 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 flex items-center justify-center m-2 hover:bg-gray-200">
                        <svg className="w-[20px] h-[20px] text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 640 512">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                        </svg>
                        {showAddPopover && (
                            <div data-popover id="pds-popover" role="tooltip" className="text-black dark:text-black flex items-center justify-center absolute z-10 w-24 h-8 text-sm transition-opacity duration-300 bg-gray-300 border border-gray-200 rounded-lg shadow-lg opacity-100 mb-16" style={{ transform: 'translateX(-70%)' }}>
                                Add Patient
                            </div>
                        )}
                    </button>
                    <div className="relative inline-block" onMouseEnter={() => setShowDeleteRestoreTooltip(true)} onMouseLeave={() => setShowDeleteRestoreTooltip(false)}>
                        <button type="filter-button" onClick={() => setShowDeleteRestore(!showDeleteRestore)}
                            className="text-white bg-gray-200 focus:outline-none focus:ring-0 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 flex items-center justify-center m-2 hover:bg-gray-200">
                            {showDeleteRestore ?
                                <svg className="w-[20px] h-[20px] text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 640 512">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                                </svg>
                                :
                                <svg className="w-[20px] h-[20px] text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 576 512">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                </svg>}
                            {showDeleteRestoreTooltip && (
                                <div id="deleted-popover" role="tooltip" className="text-black dark:text-black flex items-center justify-center absolute z-10 w-24 h-8 text-sm transition-opacity duration-300 bg-gray-300 border border-gray-200 rounded-lg shadow-lg opacity-100 mb-16" style={{ transform: 'translateX(-70%)' }}>
                                    {showDeleteRestore ? "Hide Deleted" : "Show Deleted"}
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md w-full m-2 rounded-xl">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                <button onClick={() => sorting("lastName")}>
                                    <div className="flex items-center justify-between">
                                        NAME
                                        <p className="ml-1 italic text-xs text-gray-500">- Last Name, First Name MI.</p>
                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </button>
                            </th>
                            <th scope="col" className="px-6 py-4">
                                <button onClick={() => sorting("sex")}>
                                    <div className="flex items-center justify-between">
                                        <   span className="whitespace-nowrap">SEX</span>
                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </button>
                            </th>
                            <th scope="col" className="px-6 py-4">
                                <button onClick={() => sorting("birthday")}>
                                    <div className="flex items-center justify-between">
                                        BIRTHDAY
                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </button>
                            </th>
                            <th scope="col" className="px-6 py-4">
                                <button onClick={() => sorting("address")}>
                                    <div className="flex items-center justify-between">
                                        <   span className="whitespace-nowrap">ADDRESS</span>
                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </button>
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">EDIT</th>
                            <th scope="col" className="px-6 py-4 text-center">{showDeleteRestore ? 'DELETE / RESTORE' : 'DELETE'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records && records.length > 0 ? (
                            records.map((patient) => (
                                <tr key={patient.id} className="bg-white border-b hover:bg-gray-100">
                                    <th scope="row" className="flex items-center px-6 py-1 text-gray-900 whitespace-nowrap">
                                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full hover:ring-4 hover:ring-gray-300">
                                            {imageUrl[patient.id] ? (
                                                <img src={imageUrl[patient.id]} alt="lastName" className="w-12 h-12 object-cover" />
                                            ) : (
                                                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                            )}
                                        </div>
                                        <div className="ps-3">
                                            <div className="px-6 py-1 font-semibold text-gray-600">{`${patient.lastName}, ${patient.firstName} ${patient.middleName.charAt(0)}. ${patient.suffix}`}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-1">{patient.sex.toUpperCase()}</td>
                                    <td className="px-6 py-2">{formatDate(patient.birthdate)}</td>
                                    <td className="px-6 py-1">{patient.address}</td>
                                    <td className="px-6 py-1 text-center">
                                        <button type="button" onClick={() => handleOpenEditModal(patient.id)} data-modal-target="editPatientModal" data-modal-show="editPatientModal" className="ml-3">
                                            <svg className="w-6 h-6 text-blue-600 hover:text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className="px-6 py-1 text-center">
                                        {patient.deleted ?

                                            <button type="button" onClick={() => handleOpenDeleteModal(patient.id, patient.deleted)} data-modal-target="deletePatientModal" data-modal-show="deletePatientModal" className="ml-3">
                                                <svg className="w-6 h-6 text-green-500 hover:text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 512 512">
                                                    <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z" />
                                                </svg>
                                            </button>
                                            :
                                            <button type="button" onClick={() => handleOpenDeleteModal(patient.id, patient.deleted)} data-modal-target="deletePatientModal" data-modal-show="deletePatientModal" className="ml-3">
                                                <svg className="w-6 h-6 text-red-500 hover:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 448 512">
                                                    <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                </svg>
                                            </button>}
                                    </td>
                                    {/* <td className="px-6 py-1">
                                        <span className={`inline-block w-3 h-3 rounded-full ${patient.deleted ? 'bg-red-500' : 'bg-green-500'} mr-2`}></span>
                                        {patient.deleted ? 'Deleted' : 'Active'}
                                    </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={"8"} className="text-center p-2">
                                    <p className="text-gray-400 text-center text-xs">No record found.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col justify-start ml-2 rounded-lg">
                <nav className="sticky">
                    <ul className="flex items-center -space-x-px h-8 text-sm mt-2">
                        <li className="flex">
                            <button onClick={fPage} className="flex items-center justify-center px-1 h-8 ms-0 leading-tight text-gray-500 bg-gray-100 rounded-s-lg hover:bg-gray-300 hover:text-gray-700 shadow-md">
                                <span className="sr-only">Previous</span>
                                <svg className="w-5.5 h-5.5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4" />
                                </svg>
                            </button>
                            <button onClick={prevPage} className="flex items-center justify-center px-1 h-8 ms-0 leading-tight text-gray-500 bg-gray-100 hover:bg-gray-300 hover:text-gray-700 shadow-md">
                                <span className="sr-only">Previous</span>
                                <svg className="w-5.5 h-5.5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14 8-4 4 4 4" />
                                </svg>
                            </button>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={n}>
                                    <button onClick={() => changeCurrentPage(n)} className={`flex items-center justify-center px-3 h-8 leading-tight shadow-lg 
                            ${currentPage === n ? 'text-white bg-gray-400 hover:bg-gray-500' : 'text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-gray-700'}`}>{n}
                                    </button>
                                </li>
                            ))
                        }
                        <li className="flex">
                            <button onClick={nextPage} className="flex items-center justify-center px-1 h-8 leading-tight text-gray-500 bg-gray-100 hover:bg-gray-300 hover:text-gray-700 shadow-md">
                                <span className="sr-only">Next</span>
                                <svg className="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 16 4-4-4-4" />
                                </svg>
                            </button>
                            <button onClick={lPage} className="flex items-center justify-center px-1 h-8 leading-tight text-gray-500 bg-gray-100 rounded-e-lg hover:bg-gray-300 hover:text-gray-700 shadow-md">
                                <span className="sr-only">Next</span>
                                <svg className="w-5.5 h-5.5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center text-xs text-gray-500 p-2">
                    Showing {firstIndexDisplay} - {lastIndexDisplay} of {totalPatientEntries} entries
                </div>
            </div>
            {openAddModal && (<AddPatientForm closeAddModal={handleAddModalClose} />)}
            {openEditModal && (<EditPatientForm selectedPatId={selectedPatientId} openEditModal={openEditModal} closeEditModal={handleEditModalClose} />)}
            {openDeleteModal && (<ConfirmDelete selectedPatId={selectedPatientId} openDeleteModal={openDeleteModal} closeDeleteModal={handleDeleteModalClose} isDeleted={isDeleted} />)}
        </div>
    )
}
