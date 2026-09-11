import React from 'react'
import {Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import Dashboard from './pages/dashboard';
import Response from './pages/GeneratedResponse'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/register' element={<RegisterPage/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/response' element={<Response/>}></Route>
    </Routes>
  )
}

export default App
