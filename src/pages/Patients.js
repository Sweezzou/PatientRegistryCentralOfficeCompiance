import { PatientsListTable } from "../components/PatientsListTable";

export const Patients = () => {

    return (
        <div className="p-3 sm:ml-64 mt-6">
            <div className="flew border-0 rounded-lg mt-10 pb-10">
                <div className="flex items-start justify-end h-auto rounded-lg bg-gray-0">
                    <div className="flex items-center space-x-0 m-0 px-5">
                        
                    </div>
                </div>
            </div>
            {<PatientsListTable />}
            <div className="h-7"></div>
        </div>
    )
}
