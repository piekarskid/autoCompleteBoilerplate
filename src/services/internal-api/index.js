import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users',
  responseType: 'json',
  withCredentials: true
})

export const getUsers = async () => {
  const response = await axiosInstance.get()
  return response.data
}