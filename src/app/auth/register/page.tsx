"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [retypedPassword, setRetypedPassword] = useState("")
  const [userName, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if(password != retypedPassword) return setError("Passowrds does not match")

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, userName, fullName })
    })

    if(res.ok) {
      router.push("/")
    }else{
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
              type="password"
              placeholder='Retype password'
              value={retypedPassword}
              onChange={e => setRetypedPassword(e.target.value)}
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
              disabled={!(email && password && retypedPassword && userName && fullName)}
            >
              Register
            </button>
            {error && <p className='mt-3 text-center text-red-500 text-xs'>{error}</p>}
          </div>
          <div>
          </div>
        </form>
        <div className='flex flex-col border-1 border-neutral-700 p-6 rounded mt-3 w-full'>
          <p className='text-ms text-center'>You have an account ? <Link className='text-[var(--main)]' href="/account/login">Login</Link></p>
        </div>
      </div>
    </div>
  )
}