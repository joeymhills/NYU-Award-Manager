"use client"


import { motion } from 'framer-motion';
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LogoutButton } from "~/app/auth"


export default function Appbar() {

const [role, setRole ] = useState("loading")
const {data:session} = useSession()
const router = useRouter()

useEffect(()=> {
if(session) {
  const user = session
  setRole(user.user.role)
}
if (role == "unassigned") {
  router.push("/unauthorized")
}
})

return(
<>
<div className="w-full h-6 sm:h-8 bg-[#541A83] flex flex-col justify-center items-end">
      <div className="flex flex-row gap-2 sm:gap-4 p-3">

      <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: .5, delay: .1 }}
      animate={{ opacity: 1 }}
      className='flex align-items justify-center'>
      {role == "admin" && (<Link href="/admin" className="text-white hover:text-[#f5b246] duration-500 font-bentonreg py-1 text-sm sm:text-lg sm:py-2">Admin Dashboard</Link>)}
      </motion.div>

      <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: .5 }}
      animate={{ opacity: 1 }}
      className='flex align-items justify-center'>

      {(role == "admin" || role == "manager") && (<Link href="/addAward" className="text-white hover:text-[#f5b246] duration-500 font-bentonreg py-1 text-sm sm:text-lg sm:py-2">Add Award</Link>)}
      </motion.div>
      <a type="button" className="text-white hover:text-[#f5b246] duration-500 font-bentonreg py-1 text-sm sm:text-lg sm:py-2"><LogoutButton /></a>
      </div>
  </div>
</>
)}
