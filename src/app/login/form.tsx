'use client'

import { Ring } from '@uiball/loaders'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const RegisterForm = () => {
    const router = useRouter()
    const callbackUrl =  '/'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading]= useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
try{
    setLoading(true);
    const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl
      })
      setLoading(false);
      console.log('Res', res)
      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        setError('Invalid email or password')
      }
    } catch (err: any) {}
  }


  return (
    
    <form onSubmit={onSubmit} className="w-full sm:w-[400px] font-bentonreg">
      <div className="grid w-full items-center justify-center h-8 mb-10">
        <label className= "w-72" htmlFor="email">Email</label>
        <input
          className="w-full p-1 rounded-lg border shadow-sm"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full items-center justify-center">
        <label className= "w-72" htmlFor="password">Password</label>
        <input
          className="p-1 rounded-lg border shadow-sm"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>

      <div className='flex flex-col py-4 w-full items-center text-red-600 justify-center h-8'>{error ? error : <br/>}</div>
      <div className="flex flex-col items-center justify-center">
        
        <button className="bg-[#501685] text-white flex flex-row justify-center items-center rounded-2xl w-36 py-1">
          {!loading ? "Login" : <Ring size={24} lineWeight={7} speed={2} color='white'/>}
        </button>

      </div>
    </form>
  )
}
