"use client";
import { signUpSchema } from "@/vadilations/signUpSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type signUpDto = {
    name: string,
    email: string,
    password: string
}

export default function SignUp() {
    const [error, setError] = useState('')
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(signUpSchema)
    })

    const onSubmit = async (data: signUpDto) => {
        try{
            const res = await axios.post('http://localhost:3001/auth/sign-up', data)
            if(res.status === 400){
                return
            }
            router.push('/auth/sign-in')
        }catch(e: any){
            setError(e.response.data.message)
        }
    }

  return (
    <div className="w-10/12 mx-auto border-2 border-black p-8">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name')}
          type="text"
          placeholder="name"
          className="w-full h-10 border-2 border-black rounded-md"
        />
        <p className="text-red-500">{errors?.name?.message}</p>
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
            Sign Up
        </button>
        <Link href={'/auth/sign-in'}>Sign In</Link>
      </form>
    </div>
  );
}
