"use client"
// @ts-nocheck

import { NextPage } from "next"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoutButton } from "../auth";

export default function unauthorized() {

  // User Role Authentication
  
  const [role, setRole ] = useState("loading")
  const {data:session} = useSession()
  const router = useRouter();

  useEffect(()=> {
  if(session) {
    const user = session
    setRole(user.user.role)
  }
  },[role])
  
  if((role == "manager") || (role == "user") || (role =="admin")) {
    router.push("/")
  }
  
return(
<>

<main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#f5b246] to-[#501685]">
  <div className="container flex flex-col items-center justify-center gap-2 w-9/12 ">

      <h1 className="py-24 text-center text-4xl font-bentonreg text-[#541A83]
        sm:text-4xl">Please Contact Administrator for Permissions
        </h1>
    </div>
    </main>
</>
)}
