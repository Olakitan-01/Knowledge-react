import { create } from 'zustand'
import api from '../api/axios'

const useUserStore = create((set) => ({
  // State
  profile: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

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
    localStorage.setItem('token', response.data.token)
    set({
      token: response.data.token,
      isAuthenticated: true
    })
    return response.data
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
    set({ token: null, profile: null, isAuthenticated: false })
  }
}))

export default useUserStore