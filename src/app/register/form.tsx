'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
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
    <form onSubmit={onSubmit} className="space-y-10 w-full sm:w-[400px] font-bentonreg">
      <div className="grid w-full items-center justify-center h-8">
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
      <div className="grid w-full items-center justify-center h-8">
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
      <p>{error}</p>
      <div className="flex flex-col items-center justify-center">
        <button className="bg-[#501685] text-white rounded-xl w-24 py-1">
          Register
        </button>
      </div>
    </form>
  )
}