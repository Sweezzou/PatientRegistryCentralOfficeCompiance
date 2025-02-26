import axios from 'axios';
class UserService {

    static url = "http://localhost:8083";

    static async login(email, password) {
        try {
            const response = await axios.post(`${UserService.url}/public/login`, { email, password })
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static async getYourProfile(token) {
        try {
            const response = await axios.get(`${UserService.url}/public/get-profile`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async register(userData) {
        try {
            const response = await axios.post(`${UserService.url}/public/register`, userData)
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

}

export default UserService;