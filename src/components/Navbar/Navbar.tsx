import Link from 'next/link'
import React from 'react'
import { Home, Search } from "lucide-react"

const Navbar = () => {
  return (
    <nav className='w-fit border-r-1 border-neutral-800 p-2 h-screen'>
      <Link href={"/"} className='flex min-w-[220px] px-5 py-3 my-2 items-center rounded-md transition-colors hover:bg-neutral-800 outline-none'>
        <Home />
        <p className='pl-3'>Home</p>
      </Link>
      <Link href={"/"} className='flex min-w-[220px] px-5 py-3 my-2 items-center rounded-md transition-colors hover:bg-neutral-800 outline-none'>
        <Search />
        <p className='pl-3'>Search</p>
      </Link>
    </nav>
  )
}

export default Navbar