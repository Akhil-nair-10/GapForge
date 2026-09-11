import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const RegisterPage = () => {

  const navigate = useNavigate();
  const { handleRegister, loading, error } = useAuth();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleMouseMove(e) {
    setMousePos({
      x: e.clientX,
      y: e.clientY
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await handleRegister({
      username,
      email,
      password
    });

    if(data){
      navigate('/dashboard');
    }
  }

  return (
    <div
      className='min-h-screen flex justify-center items-center px-5 py-10 text-white'
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #3b1464, #08020d 80%)`
      }}
    >

      <div className='w-full max-w-md p-7 lg:p-9 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm'>

        <div className='mb-8'>
          <p className='text-teal-400 text-sm font-medium mb-2'>
            GAPFORGE
          </p>

          <h1 className='text-3xl lg:text-4xl font-bold tracking-tight'>
            Create an account
          </h1>

          <p className='text-gray-400 mt-2'>
            Start building your career with GapForge.
          </p>
        </div>

        <form
          className='flex flex-col gap-5'
          onSubmit={handleSubmit}
        >

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold'>
              Username
            </label>

            <input
              type='text'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 outline-none placeholder:text-gray-500 focus:border-teal-400/50 transition'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold'>
              Email
            </label>

            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 outline-none placeholder:text-gray-500 focus:border-teal-400/50 transition'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold'>
              Password
            </label>

            <input
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 outline-none placeholder:text-gray-500 focus:border-teal-400/50 transition'
            />
          </div>

          {error && (
            <p className='text-red-400 text-sm text-center'>
              {error}
            </p>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full h-12 mt-2 rounded-xl bg-teal-400 text-black font-semibold hover:bg-teal-300 hover:shadow-[0_0_25px_rgba(45,212,191,0.15)] active:scale-[0.99] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>

        <p className='text-center text-sm text-gray-500 mt-7'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='text-teal-400 font-semibold hover:text-teal-300 transition'
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  )
}

export default RegisterPage