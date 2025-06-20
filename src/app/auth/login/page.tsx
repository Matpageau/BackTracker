"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if(res.ok) {
      router.push("/")
    } else {
      const data = await res.json()
      setError(data.message)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='w-1/4'>
        <form 
          onSubmit={handleSubmit}
          className='flex flex-col border-1 border-neutral-700 p-6 rounded'
        >
          <h1 className='text-center text-2xl font-extrabold'>Nomada</h1>
          <div className='flex flex-col mt-6'>
            <input 
              type="email"
              placeholder='Username or e-mail'
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
            <button
              type='submit'
              className='bg-[var(--main)] rounded mt-3 cursor-pointer hover:bg-[var(--main-hover)] transition-all disabled:cursor-auto disabled:opacity-50 disabled:hover:bg-[var(--main)]'
              disabled={!(email && password)}
            >
              Login
            </button>
            {error && <p className='mt-3 text-center text-red-500 text-xs'>{error}</p>}
          </div>
          <div>
          </div>
        </form>
        <div className='flex flex-col border-1 border-neutral-700 p-6 rounded mt-3 w-full'>
          <p className='text-ms text-center'>You don&apos;t have an account ? <a className='text-[var(--main)]' href="/account/register">Create one</a></p>
        </div>
      </div>
    </div>
  )
}