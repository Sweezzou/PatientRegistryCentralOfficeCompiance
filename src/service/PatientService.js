import axios from "axios";

class PatientService {

    static url = "http://localhost:8083";

    static async getAllPatients(token) {
        try{
            const response = await axios.get(`${PatientService.url}/public/get-all-patients`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getPatientPhoto(filename, token) {
        try {
            const response = await axios.get(`${PatientService.url}/public/image/${filename}`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });
            const imageUrl = URL.createObjectURL(response.data);
            return imageUrl;
        }catch(err){
            throw err;
        }
    }

    static async addPatient(patientData, token) {
        try {
            const response = await axios.post(`${PatientService.url}/public/add-patient`, patientData, 
            {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getPatientById(id, token){
        try{
            const response = await axios.get(`${PatientService.url}/public/get-patient/${id}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async updatePatient(id, updatedPatientData, token) {
        try {
            const response = await axios.put(`${PatientService.url}/public/update-patient/${id}`, updatedPatientData,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
          return response.data;
        } catch (error) {
          throw error;
        }
    }

    static async updatePatientDeleted(id, updatedPatientData, token) {
        try {
            const response = await axios.put(`${PatientService.url}/public/update-patient-deleted/${id}`, updatedPatientData,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
          return response.data;
        } catch (error) {
          throw error;
        }
    }
}

export default PatientService;