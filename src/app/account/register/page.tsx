"use client"
import React, { useState } from 'react'

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userName, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage("")

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, userName, fullName })
    })

    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='w-2/7'>

        <form 
          onSubmit={handleSubmit}
          className='flex flex-col border-1 border-neutral-700 p-6 rounded'
        >
          <h1 className='text-center text-2xl font-extrabold'>Nomada</h1>
          <div className='flex flex-col mt-6'>
            <input 
              type="email"
              placeholder='E-mail'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='border-1 p-2 text-sm outline-none bg-[var(--input-background)]' 
              required
            />
            <input 
              type="password"
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='border-1 p-2 text-sm mt-2 outline-none bg-[var(--input-background)]'
              required
            />
            <input 
              type="text"
              placeholder='Username'
              value={userName}
              onChange={e => setUsername(e.target.value)}
              className='border-1 p-2 text-sm mt-2 outline-none bg-[var(--input-background)]'
              required
            />
            <input 
              type="text"
              placeholder='Full name'
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className='border-1 p-2 text-sm mt-2 outline-none bg-[var(--input-background)]'
              required
            />
            <button
              type='submit'
              className='bg-[var(--main)] rounded mt-3 cursor-pointer hover:bg-[var(--main-hover)] transition-all disabled:cursor-auto disabled:opacity-50 disabled:hover:bg-[var(--main)]'
              disabled={!(email && password && userName && fullName)}
            >
              Register
            </button>
            {message && <p className='mt-3 text-center text-red-500 text-xs'>{message}</p>}
          </div>
          <div>
          </div>
        </form>
        <div className='flex flex-col border-1 border-neutral-700 p-6 rounded mt-3 w-full'>
          <p className='text-ms text-center'>You have an account ? <a className='text-[var(--main)]' href="/account/login">Login</a></p>
        </div>
      </div>
    </div>
  )
}