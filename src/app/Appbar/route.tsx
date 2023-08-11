"use client"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Link from "next/link"
import { LoginButton, LogoutButton } from "../auth"

export default async function Appbar() {

const session = await getServerSession(authOptions)

return(
<>
    <div className="w-full h-6 sm:h-8 bg-[#541A83] flex flex-col justify-center items-end">
        <div className="flex flex-row gap-2 sm:gap-4 p-3">
        {!session && (<a type="button" className="text-white hover:text-[#f5b246] duration-500 font-bentonreg py-1 text-sm sm:text-lg sm:py-2"><LoginButton /></a>)}
        {session && (<a type="button" className="text-white hover:text-[#f5b246] duration-500 font-bentonreg py-1 text-sm sm:text-lg sm:py-2"><LogoutButton /></a>)}
        <Link href="/addAward" className="text-white hover:text-[#f5b246] duration-500 font-bentonreg py-1 text-sm sm:text-lg sm:py-2">Add Award</Link>
        <Link href="/admin" className="text-white hover:text-[#f5b246] duration-500 font-bentonreg py-1 text-sm sm:text-lg sm:py-2">Admin Page</Link>
        </div>
    </div>
</>
)
}