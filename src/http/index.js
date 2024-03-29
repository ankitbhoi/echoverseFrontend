import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
})

//all endpoints

export const sendOtp = (data) => {
  return api.post('/api/send-otp/', data)
}

export const verifyOtp = (data) => {
  return api.post('/api/verify-otp/', data)
}

export const activate = (data) => {
  return api.post('/api/activate/', data)
}

export const logout = () => {
  return api.post('/api/logout/')
}

export const createRoom = (data) => {
  return api.post('/api/rooms/', data)
}

export const getAllRooms = () => {
  return api.get('/api/rooms/')
}

export const getRoom = (id) => {
  return api.get(`/api/rooms/${id}`)
}

// interceptors

api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
          withCredentials: true,
        })

        return api.request(originalRequest)
      } catch (err) {
        Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)
export default api
