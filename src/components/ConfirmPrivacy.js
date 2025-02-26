import { useState } from "react";

export const ConfirmPrivacy = ({ closeModal, openModal, onConfirm }) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const isButtonDisabled = !(isChecked);

    return (
        <div id="popup-modal" tabIndex="-1" className={`${openModal ? '' : 'hidden'} fixed inset-0 z-50 overflow-x-auto bg-gray-900 bg-opacity-50 px-2 py-2 mx-auto md:h-screen lg:py-0`}>
            <div className="relative lg:m-auto lg:my-8 sm:m-4 w-full max-w-4xl bg-gray-50 rounded-xl shadow-xl">
                <div className="relative bg-white rounded-2xl">
                    <div className="py-2 px-3 md:p-5 text-center">
                        <h3 className="text-lg font-semibold text-gray-600">Human Resource Information System (HRIS)</h3>
                        <h3 className="mb-3 text-2xl font-semibold text-gray-600">Privacy Notice/Policy</h3>
                        <hr className="border-gray-400 m-3" />
                        <div className="flex items-center text-sm text-start text-gray-600 mb-6 px-3">
                            This system enables the DOH Western Visayas Center for Health Development to collect, process, managing and organizing patient data. Please read this notice carefully to understand our practices regarding your information.
                        </div>
                        <div className="text-start px-3">
                            <h3 className="text-base font-semibold text-gray-600 mb-1">Manner of Collection and Description of Personal Data Collected</h3>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                Authorized personnel from the DOH Western Visayas Center for Health Development manually collect personal data through the prescribed Individual Treatment Record (ITR) of each patient. This data is then carefully entered into the organization's system for processing and record-keeping purposes. The collection process ensures that all relevant and necessary personal details are accurately captured and stored in compliance with applicable data privacy and protection regulations.
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mt-4">
                                <h3 className="text-base font-semibold text-gray-600 mb-1">Purpose, Use and Basis for Processing of Personal Data</h3>
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                Authorized Personnel of DOH CHD manually collects data using the prescribe Individual Treatment Record (ITR) of patient and enroll them to the system using the following data:
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600">
                                <h3 className="text-base font-semibold text-gray-600 mb-1 mt-4">Methods used for Automated Access</h3>
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                DOH WV CHD uses Electronic System to process and manage the patient record.
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600">
                                <h3 className="text-base font-semibold text-gray-600 mb-1 mt-4">Disclosure and Sharing of Personal Data</h3>
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                The Patient Registry does not disclose or share its data with external party and only limited within DOH WV CHD. We may disclose information in response to legal requests or as required by law.
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600">
                                <h3 className="text-base font-semibold text-gray-600 mb-1 mt-4">Risk Involved</h3>
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                Risk pertains to the possibility of an event causing harm or peril to either a data subject or an organization. These potential risks could result in the unauthorized disclosure or access to personal data. This encompasses risks related to the confidentiality, integrity, and availability of personal information, as well as the risk of processing actions violating general data privacy principles and the rights of data subjects.
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                <p className="ml-6 text-sm">
                                    1. Unauthorized Access: Improper user access controls may allow unauthorized personnel to view or manipulate sensitive information.<br />
                                    2. Human Errors: Inaccurate data entry or mishandling of information by users could lead to incorrect records.<br />
                                </p>
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600">
                                <h3 className="text-base font-semibold text-gray-600 mb-1 mt-4">Data Protection and Security Measures</h3>
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                We safeguard the confidentiality, integrity and availability of your personal data by maintaining a combination of organizational, physical, and technical security measures based on generally accepted data privacy and information security standards through:
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                <p className="ml-6 text-sm">
                                    •	Encryption: Your data is encrypted during transmission and storage to prevent unauthorized access.<br />
                                    •	Access Controls: We implement strict access controls to ensure that only authorized personnel can access payroll information.<br />
                                    •	Regular Audits: Our systems undergo regular audits and monitoring to identify and address security vulnerabilities.<br />
                                </p>
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600">
                                <h3 className="text-base font-semibold text-gray-600 mb-1 mt-4">Storage, Retention and Disposal</h3>
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                We store your personal data in our in-house server under the supervision of Information and Communication Technology Unit. Rest assured, the server has security measures and controls in place to protect your information.
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600">
                                <h3 className="text-base font-semibold text-gray-600 mb-1 mt-4">Rights of the Data Subject</h3>
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                As Data Subject, you have the right to be informed regarding processing the personal data we hold about you.
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-1">
                                In addition, you may be entitled to the following:
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                <p className="ml-6 text-sm">
                                    a.  Access to your data. You have the right to confirm the status and details relating to your data;<br />
                                    b.  Editing/updating your data is only applicable;<br />
                                    c.  Object to the processing of your data if based on consent or legitimate interest;<br />
                                    d.  Data deletion can be requested by completing a Service Request Form. However, approval is required, as the request will be evaluated based on the type of data to be deleted.<br />
                                </p>
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                You can exercise your rights by writing a formal letter/documentation to authorized personnel of DOH CHD.
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600">
                                <h3 className="text-base font-semibold text-gray-600 mb-1 mt-4">Amendments of the Privacy Notice</h3>
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                This office reserves the right to amend this Privacy Notice upon its instance and shall furnish a revised notice when changes are introduced.
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600">
                                <h3 className="text-base font-semibold text-gray-600 mb-1 mt-4">Feedbacks and Comments</h3>
                            </div>
                            <div className="flex items-center text-sm text-start text-gray-600 mb-2">
                                For any feedbacks and comments relating to our privacy notice, you may reach our Data Protection Office, Atty. Jan Reuell Valaquio, through the following contact information: (033) 332-2329 loc 137 or dohwvchd.dpo@gmail.com.
                            </div>
                            <hr className="mt-3 border-gray-400" />
                        </div>
                        <div className="flex items-center mb-4 mt-5 px-3">
                            <input id="checkbox-2" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                            <label htmlFor="checkbox-2" className="ms-2 text-sm font-medium text-gray-800">I have read and understand.</label>
                        </div>
                        <div className="flex justify-start mt-6 px-3">
                            <button data-modal-hide="popup-modal" type="button" onClick={onConfirm} className={`text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-base inline-flex items-center justify-center px-6 py-2 text-center mr-4 w-24 h-8 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isButtonDisabled}>
                                Proceed
                            </button>
                            <button data-modal-hide="popup-modal" type="button" onClick={closeModal} className="text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none font-medium rounded-lg text-base inline-flex items-center justify-center px-6 py-2 text-center w-24 h-8">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
