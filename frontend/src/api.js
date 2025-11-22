// this file is the communicator between the backend and the front end. this is where the api endpoints are able to be called.
import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL, // "http://127.0.0.1:8000",
})

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(ACCESS_TOKEN)
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default api
export async function searchItems(query) {
    const response = await fetch(`${API_URL}/search/?q=${query}`);
    return response.json();
}

// later you’ll add token logic here
// export const getUsers = () => api.get("users/")
// export const createUser = (data) => api.post("users/", data)
