"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect } from 'react'
import Image from 'next/image'
const AvatarHeader = ({img}: {
    img: string | null | undefined
}) => {
  return (
    <div className='relative w-fit'>
        <div className=''>
            <Image
            src={ img  || "/logo.jpg"}
            width={50}
            height={50}
            alt="Avatar"
            className='rounded border size-6'
            />
        </div>
        <span className='border-background absolute -end-1.5 -top-1.5 size-3 rounded-full border-2 bg-amber-600 dark:bg-amber-400'>
            <span className='sr-only'>Away</span>
        </span>
    </div>
  )
}

export default AvatarHeader