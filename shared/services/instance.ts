import axios, { AxiosInstance } from 'axios'

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
})
