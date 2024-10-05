'use client'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type UserType = {
    email: string
    name: string
    _id: string
    posts: string[]

}

export default function Dashboard() {
    const router = useRouter()
    const [accessToken, setAccessToken] = useState<null | string>()
    const [user, setUser] = useState<UserType>()

    async function getUserInfo(accessToken:string | undefined){
        try{
            const res = await axios.get('http://localhost:3001/auth/current-user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setUser(res.data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        const token = getCookie('accessToken')
        if(!token) router.push('/auth/sign-up')
        setAccessToken(token)
        getUserInfo(token)

    }, [])

    console.log(user, "user")

    if(!accessToken) return

  return (
    <div>
        <h1>Dashboard</h1>
        <div className='border-2 border-black p-10'>
            <h1 className='text-center'>User Info</h1>
            <h2>Name: {user?.name}</h2>
            <h2>Email: {user?.email}</h2>
        </div>
    </div>
  )
}
