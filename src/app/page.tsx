"use client"

import { cookies } from 'next/headers'
import Image from "next/image";
import grid1 from "../assets/grid1.png"
import grid2 from "../assets/grid2.png"
import grid3 from "../assets/grid3.png"
import grid4 from "../assets/grid4.png"
import grid5 from "../assets/grid5.png"
import grid6 from "../assets/grid6.png"
import grid7 from "../assets/grid7.png"
import grid8 from "../assets/grid8.png"
import grid9 from "../assets/grid9.png"
import SearchInput from '~/SearchInput'
import React from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"
import { motion } from 'framer-motion';
import { searchLocationFilter, searchServiceFilter } from '~/components/atoms';
import {  useSetAtom } from 'jotai';
import HomeServiceDropdown from '~/components/HomeServiceDropdown';

export default function Home() {

  const [role, setRole ] = useState("loading")
  const {data:session} = useSession()
  const router = useRouter()

  const setServiceFilter = useSetAtom(searchServiceFilter)
  const setLocationFilter = useSetAtom(searchLocationFilter)

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
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#f5b246] to-[#501685]">
        <div className="container flex flex-col items-center justify-center gap-2 w-9/12 ">

          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: .5 }}
            animate={{ opacity: 1 }}>
            <h1 className="pb-3 pt-28 text-4xl font-bentonreg text-[#541A83]
           lg:text-8xl
           md:text-7xl 
           sm:text-6xl">
            #The<span className="font-bentonbold">BestOutcomes</span>
          </h1>
          </motion.div>

          <div>
          <div>
            <div className=" text-white max-w-xs text-sm font-bentonbold 
            lg:text-3xl lg:max-w-2xl 
            md:text-xl md:max-w-xl
            sm:text-md sm:max-w-lg
            ">
            <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: .5, delay: .05 }}
            animate={{ opacity: 1 }}>
              <p className="text-center pb-3">
              This internal tool offers quick access to review accolades and awards given to NYU from independent organizations.
              </p>
            </motion.div>
            </div>
            </div>
            </div>


          <div>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: .5, delay: .1 }}
            animate={{ opacity: 1 }}>
          <div className=" 
            lg:max-w-2xl 
            md:max-w-xl
            sm:max-w-lg">
            <div className="flex flex-row gap-1 pb-5">
              <SearchInput />
            </div>
            </div>
          
            <div className='w-screen-full flex gap-2 flex-row justify-center items-center pb-3'>
              <HomeServiceDropdown />
            <button className="rounded-lg bg-white px-5 py-2 text-md font-bentonreg text-gray-900 drop-shadow-md ring-1 ring-inset
            ring-gray-300 hover:cursor-pointer hover:bg-gray-50" onClick={()=>{setLocationFilter(""); setServiceFilter("")}}>Clear</button>
            </div>
          </motion.div>
          </div>

          <div>
          <div>

          </div>
          </div>

            <div> 

            <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: .5, delay: .15 }}
            animate={{ opacity: 1 }}>
          <div className="flex flex-col md:w-150 lg:w-180 gap-8 pb-16">

          <div className='flex flex-row gap-8'>
          <button type="button" onClick={()=>{setLocationFilter("NYU Langone Hospital—Long Island");router.push("search?q=")}} className="flex flex-col items-center justify-center gap-4">
              <Image src={grid6} height={320} width={320} className=" shadow-lg rounded-2xl" alt={""} />
              <p className="text-white h-8 text-xs mb-6 sm:text-md lg:text-lg font-bentonbold">NYU Langone Hospital—Long Island</p>
            </button>

            <button type="button" onClick={()=>{setLocationFilter("NYU Langone Orthopedic Hospital");router.push("search?q=")}}  className="flex flex-col items-center justify-center gap-4 ">
              <Image src={grid5} height={320} width={320} className=" shadow-lg rounded-2xl" alt={""} />
              <p className="text-white h-8 text-xs mb-6 lg:text-lg font-bentonbold">NYU Langone Orthopedic Hospital</p>
            </button>

            <button type="button" onClick={()=>{setLocationFilter("NYU Langone Hospital—Brooklyn");router.push("search?q=")}} className="flex flex-col items-center justify-center gap-4 ">
              <Image src={grid3} height={320} width={320} className=" shadow-lg rounded-2xl" alt={""} />
              <p className="text-white h-8 text-xs mb-6 lg:text-lg font-bentonbold">NYU Langone Hospital—Brooklyn</p>
            </button>
          </div>

          <div className='flex flex-row gap-8'>
            <button type="button" onClick = {() =>{setLocationFilter("Rusk Rehabilitation");router.push("/search?q=")}} className="flex flex-col items-center justify-center gap-4 ">
              <Image src={grid4} height={320} width={320} className=" shadow-lg rounded-2xl" alt={""} />
              <p className="text-white h-8 text-xs mb-6 lg:text-lg font-bentonbold">Rusk Rehabilitation</p>
            </button>

            <button type="button" onClick={()=>{setLocationFilter("");setServiceFilter("");router.push("search?q=")}} className="flex flex-col items-center justify-center gap-4 ">
              <Image src={grid2} height={320} width={320} className=" shadow-lg rounded-2xl" alt={""} />
              <p className="text-white text-xs mb-6 lg:text-lg h-8 font-bentonbold">Institution Wide Accolades</p>
              </button>

            <button type="button" className="flex flex-col items-center justify-center gap-4 ">
              <Image src={grid1} onClick={()=>{setLocationFilter("Tisch Hospital and Kimmel Pavilion");router.push("search?q=")}} height={320} width={320} className="shadow-lg rounded-2xl" alt={""} />
              <p className="text-white h-8 mb-6 text-xs lg:text-lg font-bentonbold">Tisch Hospital and Kimmel Pavilion</p>
            </button>
           </div>

          <div className='flex flex-row gap-8'>
            <button type="button" onClick={()=>{router.push("search?q=medical%20education")}} className="flex flex-col items-center justify-center gap-4">
                <Image src={grid7} height={320} width={320} className="shadow-lg rounded-2xl" alt={""} />
                <p className="text-white h-8 text-xs mb-6 lg:text-lg font-bentonbold">Medical Education</p>
            </button>

              <button type="button" onClick={()=>{router.push("search?q=nursing")}} className="flex flex-col items-center justify-center gap-4">
                <Image src={grid8} height={320} width={320} className="rounded-2xl" alt={""} />
                <p className="text-white h-8 text-xs mb-6 lg:text-lg font-bentonbold">Nursing</p>
              </button>

              <button type="button" onClick={()=>{router.push("search?q=research")}}className="flex flex-col items-center justify-center gap-4">
                <Image src={grid9} height={320} width={320} className="rounded-2xl" alt={""} />
                <p className="text-white h-8 text-xs mb-6 lg:text-lg font-bentonbold">Research</p>
              </button>
            </div>

            </div>
            </motion.div>
            </div>

        </div>
      </main>
    </>
)}
