"use client";
import { signInSchema } from "@/vadilations/signInSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type signInDto = {
    email: string,
    password: string
}

export default function SignIn() {

    const [error, setError] = useState('')
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(signInSchema)
    })

    const onSubmit = async (data: signInDto) => {
        try{
            const res = await axios.post('http://localhost:3001/auth/sign-in', data)
            const accessToken = res.data.accessToken
            setCookie('accessToken', accessToken, {maxAge: 60 * 60})
            
            router.push('/')
        }catch(e: any){
            setError(e.response.data.message)
        }
    }

  return (
    <div className="w-10/12 mx-auto border-2 border-black p-8">
    <h1>Sign In</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
      {...register('email')}
        type="text"
        placeholder="email"
        className="w-full h-10 border-2 border-black rounded-md"
      />
      <p className="text-red-500">{errors?.email?.message}</p>
      <input
      {...register('password')}
        type="password"
        placeholder="password"
        className="w-full h-10 border-2 border-black rounded-md"
      />
      <p className="text-red-500">{errors?.password?.message}</p>
      <p className="text-red-500">{error}</p>

      <button className="w-[200px] p-3 bg-blue-600">
          Sign In
      </button>
      <Link href={'/auth/sign-in'}>Sign Up</Link>
    </form>
  </div>
  )
}
