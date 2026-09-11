import { useState } from 'react'
import { login, register, logout, getMe } from '../services/auth.api'

export function useAuth() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleLogin({ email, password }) {
        setLoading(true)
        setError(null)

        try {
            const data = await login({ email, password })
            return data
        }
        catch (err) {
            setError(err.response?.data?.message || "Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }

    async function handleRegister({ username, email, password }) {
        setLoading(true)
        setError(null)

        try {
            const data = await register({ username, email, password })
            return data
        }
        catch (err) {
            setError(err.response?.data?.message || "Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }

    async function handleLogout() {
        setLoading(true)
        setError(null)

        try {
            const data = await logout()
            setUser(null)
            return data
        }
        catch (err) {
            setError(err.response?.data?.message || "Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }

    async function fetchUser() {
        setLoading(true)
        setError(null)

        try {
            const data = await getMe()
            setUser(data.user)
            return data
        }
        catch (err) {
            setError(err.response?.data?.message || "Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }

    return {
        user,
        loading,
        error,
        handleLogin,
        handleRegister,
        handleLogout,
        fetchUser
    }
}