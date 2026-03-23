import { create } from 'zustand'
import api from '../api/axios'

// Check token expiry on startup — runs before store is created
const tokenExpiresAt = localStorage.getItem('tokenExpiresAt')
const tokenExpired = tokenExpiresAt && Date.now() > Number(tokenExpiresAt)

if (tokenExpired) {
  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpiresAt')
}

const useUserStore = create((set) => ({
  // State
  profile: null,
  token: tokenExpired ? null : localStorage.getItem('token') || null,
  isAuthenticated: tokenExpired ? false : !!localStorage.getItem('token'),

  // Signup
  signup: async (formData) => {
    const response = await api.post('/auth/signup', formData)
    return response.data
  },

  // Login
  login: async (formData) => {
    const response = await api.post('/auth/login', {
      email: formData.email,
      password: formData.password
    })

    const token = response.data.token
    const expiresAt = Date.now() + 60 * 60 * 1000

    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpiresAt', expiresAt)

    set({ token, isAuthenticated: true })

    return response.data
  },

  // Check token expiry
  checkTokenExpiry: () => {
    const expiresAt = localStorage.getItem('tokenExpiresAt')
    if (expiresAt && Date.now() > Number(expiresAt)) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiresAt')
      set({ token: null, profile: null, isAuthenticated: false })
    }
  },

  // Fetch profile
  fetchProfile: async () => {
    const response = await api.get('/users/me')
    set({ profile: response.data })
  },

  // Update profile
  updateProfile: async (updateData) => {
    const response = await api.patch('/users/me', updateData)
    set({ profile: response.data })
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiresAt')
    set({ token: null, profile: null, isAuthenticated: false })
  }
}))

export default useUserStore