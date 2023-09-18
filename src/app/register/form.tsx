'use client'

import Ring from '@uiball/loaders/dist/components/Ring'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading]= useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setLoading(false)
      if (res.ok) {
        signIn()
      } else {
        setError((await res.json()).error)
      }
    } catch (error: any) {
      setError(error?.message)
    }
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
      <div className='flex flex-col py-4 w-full items-center text-red-600 justify-center h-8'>{error ? "Email already taken" : <br/>}</div>      
      <div className="flex flex-col items-center justify-center">
      <button className="bg-[#501685] drop-shadow-lg text-white flex flex-row justify-center items-center rounded-lg w-36 py-1">
          {!loading ? "Register" : <Ring size={24} lineWeight={7} speed={2} color='white'/>}
      </button>
      </div>
    </form>
  )
}
