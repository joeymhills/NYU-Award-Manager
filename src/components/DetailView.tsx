"use client"

import { AnimatePresence, motion } from "framer-motion";
import { NextApiResponse } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UploadButton } from "~/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useAtom } from "jotai";
import { showDetailPage } from "./atoms";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
id:string,
name:string,
institution:string,
outcome:string,
extSource:string,
intSource:string,
messaging:string,
comments:string,
frequency:string,
notifDate:string,
cmcontact:string,
sourceatr:string,
wherepubint:string,
promotionlim:string,
imgurl:string
}

interface FormData {
  institution: string,
  name: string,
  comments: string
  outcome: string
  intSource: string
  extSource: string
  messaging: string
  frequency: string
  notifDate: string
  cmcontact: string
  sourceatr: string
  wherepubint: string
  promotionlim: string
  imgurl: string
  id: string
}

  const DetailView: React.FC<Props> = (

    {id,name,institution,outcome,extSource,intSource,messaging, 
    comments,frequency,notifDate,cmcontact,sourceatr,wherepubint,promotionlim,imgurl}) => {

      const [editPage,setEditPage] = useState(1)
      const router = useRouter()
      const [role, setRole ] = useState("loading")
      const {data:session} = useSession()
      useEffect(()=> {
      if(session) {
      setRole(session.user.role)
  }
  })
    
      const [deleteWindow,setDeleteWindow] = useState(false)
      const [editWindow, setEditWindow] = useState(false)
      const [showDetail,setShowDetail] = useAtom(showDetailPage)

      const [form, setForm] = useState<FormData>({id: id, institution: institution, name: name, comments: comments, outcome: outcome, intSource: intSource, extSource: extSource,
      messaging: messaging, frequency: frequency, notifDate: notifDate, cmcontact: cmcontact, sourceatr: sourceatr, wherepubint: wherepubint, promotionlim: promotionlim, imgurl:imgurl})

      async function update(data: FormData) { 
        try {
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/update`,{
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'Application/json'},
            method: 'PUT'});
        }
        catch (error) {
          console.log('error in POST request()')
        }
        (()=> setForm({id: '', institution: '', name: '', comments: '', outcome: '', intSource: '', extSource: '',
        messaging: '', frequency: '', notifDate: '', cmcontact: '', sourceatr: '', wherepubint: '', promotionlim: '', imgurl: ''}))
      }
    
      async function handleSubmit (data: FormData) {
        try {
          await update(data);
          notifyUpdate()
        } catch (error) {
          console.log('error in handleSubmit')
        }
      }
     
      const notifyUpdate = () => toast.success('Entry was successfully updated!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });      


      const notifyDelete = () => toast.success('Entry was successfully deleted!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        
      async function deleteAccolade(id: string) { 
        try {
          await fetch("/api/delete",{
            body: JSON.stringify(id),
            headers: { 'Content-Type': 'Application/json'},
            method: 'POST'});
        }
        catch (error) {
            console.log('error in DELETE request()')
        }
        setDeleteWindow(false)
        setShowDetail(false)
        notifyDelete()
    }

      return (
        <>
          <AnimatePresence>
            <motion.div className="flex fixed top-0 right-0 z-30 min-h-screen w-screen flex-col items-center bg-black/50">  

              {deleteWindow &&(
                <motion.div className="flex fixed top-0 right-0 z-50 min-h-screen bg-black/50 w-screen flex-col items-center">
                    <div className="w-96 h-54 z-80 p-5 m-12 bg-white fixed rounded-2xl">
                        <div className="flex flex-col justify-center items-center gap-3"> 
                            <div>
                                <p className="text-center font-bentonbold">Are you sure you want to delete this entry?</p>
                            </div>
                            <div className="flex flex-row justify-center gap-2">
                                <button className="bg-white border-2 border-[#541A83] rounded-2xl text-[#541A83] h-8 w-32" onClick={()=>{setDeleteWindow(false)}}>Cancel</button>
                                <button className="bg-red-500 rounded-2xl text-white h-8 w-32" onClick={()=>{deleteAccolade(id);setDeleteWindow(false)}}>Delete</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
              )}
             
            <div className=" flex flex-col gap-6 justify-center relative align-middle w-200 bg-white rounded-lg border-2 p-5 m-4 text-2xl font-bentonbold">
            <div className="hover:cursor-pointer h-9 w-9 md:h-11 md:w-11 z-30 absolute right-3 top-3"onClick={() => setShowDetail(false)}><XMarkIcon/></div>
                <div >{institution}</div> 
                {name !== "" && (<div className="font-bentonreg border-b-[2px] pb-4">{name}</div>)}
                {((imgurl !== null) && (imgurl !== "")) &&(<div className="flex flex-row font-bentonreg justify-center items-center text-base"> <div><Link href={imgurl}>Download link</Link></div><img src={imgurl} className="h-36 w-36"/></div>)}
                {outcome !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Outcome: </span>{outcome}</div>)}
                {intSource !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Internal Source: </span>{intSource}</div>)}
                {extSource !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">External Source: </span>{extSource}</div>)} 
                {comments !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Comments: </span>{comments}</div>)}
                {messaging !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Messaging: </span>{messaging}</div>)}
                {frequency !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Frequency: </span>{frequency}</div>)}
                {notifDate !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Notification Date: </span>{notifDate}</div>)}
                {cmcontact !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">C&M Contact Line: </span>{cmcontact}</div>)}
                {sourceatr !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Source Attribution: </span>{sourceatr}</div>)}
                {wherepubint !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Where Published Internally: </span>{wherepubint}</div>)}
                {promotionlim !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Limitations on Promotion: </span>{promotionlim}</div>)}
                
                {((role == "admin") || (role == "manager")) &&(
                <div className="flex flex-row justify-center items-center gap-3">
                  <button className="bg-white border-2 font-bentonreg border-[#541A83] text-[#541A83] h-8 w-36 rounded-2xl"onClick={()=> {setShowDetail(false);router.push(`/editAward/${id}`)}}>Edit</button>
                  <button className="bg-red-500 w-36 h-8 text-white font-bentonreg rounded-2xl"onClick={()=>setDeleteWindow(true)}>Delete</button>
                </div>
                )}
                <ToastContainer 
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  />
            </div>    
                </motion.div>
              <div>
              </div>
            </AnimatePresence>
        </>
    )
}
export default DetailView