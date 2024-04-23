import { getToken, clearToken } from '@/helpers/authetication.helper'
import axios from 'axios'
const url = import.meta.env.VITE_API || ''

const UniversityAPI = () => {
  const api = axios.create({
    baseURL: url
  })

  api.interceptors.request.use(
    (config) => {
      const token = getToken()

      if (token) {
        config.headers['Authorization'] = `${token}`
      }

      return config
    },
    (error) => {
      if (error.response.status === 501) {
        clearToken()
      }
      return Promise.reject(error)
    }
  )
  return api
}

export default UniversityAPI()
