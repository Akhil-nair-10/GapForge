import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getMe } from '../services/auth.api'

const ProtectedRoute = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {

        async function checkAuth() {

            try {
                await getMe()
                setIsAuthenticated(true)
            }
            catch (err) {
                setIsAuthenticated(false)
            }
            finally {
                setLoading(false)
            }

        }

        checkAuth()

    }, [])

    if (loading) {
        return (
            <div className='h-screen w-screen flex justify-center items-center bg-[#08020d] text-white'>
                Checking authentication...
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to='/unauthorized' replace />
    }

    return children
}

export default ProtectedRoute