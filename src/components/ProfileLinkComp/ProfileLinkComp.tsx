import { UserType } from '@/types/user'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ProfileLinkProps = {
  user: UserType
}

const ProfileLinkComp: React.FC<ProfileLinkProps> = ({ user }) => {
  return (
    <div className='flex'>
      <Link href={`/${user.userName}`}>
        <Image 
          src={user.profileImg ?? "/defautProfile.jpg"}
          alt='profile picture'
          width={44}
          height={44}
          className='rounded-full'
        />
      </Link>
      <div className='ml-3'>
        <a href={`/${user.userName}`}>{user.userName}</a>
        <p className='text-neutral-400 text-sm'>{user.fullName}</p>
      </div>
    </div>
  )
}

export default ProfileLinkComp