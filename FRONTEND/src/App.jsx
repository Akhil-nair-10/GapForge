import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import Dashboard from './pages/dashboard'
import Response from './pages/GeneratedResponse'
import Unauthorized from './pages/unAuthorized'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/unauthorized' element={<Unauthorized />} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/response' element={<ProtectedRoute><Response /></ProtectedRoute>} />
    </Routes>
  )
}

export default App