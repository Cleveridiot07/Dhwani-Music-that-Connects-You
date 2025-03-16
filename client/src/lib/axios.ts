import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://dhwani-music-that-connects-you-production.up.railway.app/api/",
});
