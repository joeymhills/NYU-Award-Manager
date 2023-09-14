"use client"

import { toast } from "react-toastify";
import "@uploadthing/react/styles.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ring } from "@uiball/loaders";
import { useSession } from "next-auth/react";
import { searchCallback } from "~/components/atoms";
import { useAtomValue } from "jotai";

export default function Page({ params }: { params: { id: string } }) {

const [loading, setLoading] = useState(true)
const[deleteWindow, setDeleteWindow] = useState(false)
const [role, setRole ] = useState("loading")
const {data:session} = useSession()
const router = useRouter();

 const nullCheck = (str:string) => {
  if(str == "") {
    return false
  }
  else if(str == null) {
    return false
  }
  else {
    return true
  }
}

interface types {
  queryID: string
  query: string
  result: string[]
}

interface FormData {
    id: object,
    institution: string,
    name: string,
    serviceLine: string,
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
    imgurl1: string
    imgurl2: string
    imgurl3: string
    imgurl4: string
    expirationDate:string
    effectiveDate:string
  }

  const callbackUrl = useAtomValue(searchCallback)
  const id = params.id

  const [form, setForm] = useState<FormData>({id: {id}, institution: '', name: '', serviceLine: '', comments: '', outcome: '', intSource: '', extSource: '',
  messaging: '', frequency: '', notifDate: '', cmcontact: '', sourceatr: '', wherepubint: '', promotionlim: '', imgurl1: '', imgurl2: '', imgurl3: '', imgurl4: '', expirationDate: '',
  effectiveDate: '' })

useEffect(() => {
function send(){ 
  axios.post("/api/find", {
    id
  })
  .then(res => {
    const resdata = res.data
    setForm(resdata.accolade)
    setLoading(false)
  })
  .catch(function (error) {
    console.log(error);
  });
}
send()
},[])
useEffect(()=> {
  if(session) {
    const user = session
    setRole(user.user.role)
  }
  if (role == "unassigned") {
    router.push("/unauthorized")
  }
})

const successToast = () => toast.success('Award successfully deleted', {
    position: "bottom-right",
    autoClose: 1700,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "colored"
    });

  const errorToast = () => toast.error('Error in deletion', {
  position: "bottom-right",
  autoClose: 1700,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  theme: "colored"
    });
async function deleteAccolade(id: string) { 
  let response;
  try {
    response = await fetch("/api/delete",{
      body: JSON.stringify(id),
      headers: { 'Content-Type': 'Application/json'},
      method: 'POST'});
  }
  catch (error) {
      console.log('error in DELETE request()')
  }
  
  if(response?.ok){
    successToast()
    }
  else{
    errorToast()
    }
  setDeleteWindow(false)
}

return(
    <>
      <div className="h-px bg-white"/>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#f5b246] to-[#501685]">
        <div className="container flex flex-col items-center justify-center w-9/12 ">
        <div className="flex z-10 pt-20 min-h-screen w-screen flex-col items-center ">
            <Link href={`/search?q=${callbackUrl}`}>
            <button className={'bg-white drop-shadow-2xl font-bentonbold text-sm text-[#541A83] lg:text-md py-0 w-36 h-8 rounded-lg'}>Return to search</button>
            </Link>
        {loading && (
        <div className="w-full flex mt-8 flex-row justify-center items-center">
        <Ring
              size={80}
              // lineWeight={5}
              speed={1.75} 
              color="white" 
              />
        </div>
        )}
        {!loading &&(
                <>
                  <div className="flex min-h-screen w-screen flex-col items-center">  
                    {deleteWindow &&(
                  <AnimatePresence>
                      <motion.div  
                      key="deleteWindow"       
                      initial={{ opacity: 0 }}
                      transition={{ duration: .5 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex fixed top-0 z-50 h-screen bg-black/50 w-screen flex-col justify-center items-center">

                          <div className="w-96 h-54 z-80 p-5 m-12 bg-white fixed rounded-2xl">
                              <div className="flex flex-col justify-center items-center gap-3"> 
                                  <div>
                                      <p className="text-center font-bentonbold">Are you sure you want to delete this entry?</p>
                                  </div>
                                  <div className="flex flex-row justify-center gap-2">
                                      <button className="bg-white border-2 border-[#541A83] rounded-2xl text-[#541A83] h-8 w-32" onClick={()=>{setDeleteWindow(false)}}>Cancel</button>
                                      <button className="bg-red-500 rounded-2xl text-white h-8 w-32" onClick={()=>{deleteAccolade(id);setDeleteWindow(false);
                                      router.push(`/search?q=${callbackUrl}`)}}>Delete</button>
                                  </div>
                              </div>
                          </div>
                      </motion.div>
                      </AnimatePresence>

                    )}

                   
                  <motion.div
                      initial={{ opacity: 0 }}
                      transition={{ duration: .5 }}
                      animate={{ opacity: 1 }}>
                  <div className=" flex flex-col gap-6 justify-center relative align-middle w-96 md:w-150 lg:w-200 bg-white rounded-lg border-2 p-5 m-4 text-lg font-bentonbold">
                      <div >{form.name}</div> 

                      {nullCheck(form.institution) && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Location: </span>{form.institution}</div>)}
                      {nullCheck(form.serviceLine) && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Service Line: </span>{form.serviceLine}</div>)}
                      {form.outcome !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Outcome: </span>{form.outcome}</div>)}
                      {form.intSource !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Internal Source: </span>{form.intSource}</div>)}
                      {form.extSource !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">External Source: </span>{form.extSource}</div>)} 
                      {form.comments !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Comments: </span>{form.comments}</div>)}
                      {form.messaging !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Messaging: </span>{form.messaging}</div>)}
                      {form.frequency !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Frequency: </span>{form.frequency}</div>)}
                      {form.notifDate !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Notification Date: </span>{form.notifDate}</div>)}
                      {form.cmcontact !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">C&M Contact Line: </span>{form.cmcontact}</div>)}
                      {form.sourceatr !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Source Attribution: </span>{form.sourceatr}</div>)}
                      {form.wherepubint !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Where Published Internally: </span>{form.wherepubint}</div>)}
                      {form.promotionlim !== "" && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Limitations on Promotion: </span>{form.promotionlim}</div>)}
                      {nullCheck(form.effectiveDate) && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Effective Date: </span>{form.effectiveDate}</div>)}
                      {nullCheck(form.expirationDate) && (<div className="font-bentonreg text-base"><span className="font-bentonbold">Expiration Date: </span>{form.expirationDate}</div>)}

                      {((form.imgurl1 !== null) && (form.imgurl1 !== "")) && (<div className="flex flex-col font-bentonreg justify-center items-center text-base">
                      <img src={form.imgurl1} className="h-24 w-24"/>
                      <div>
                          <Link className="rounded-lg bg-white px-5 py-2 text-md font-bentonreg text-gray-900 drop-shadow-md ring-1 ring-inset
                          ring-gray-300 hover:cursor-pointer hover:bg-gray-50"
                            href={form.imgurl1}>Download link</Link>
                       </div>
                      </div>)}

                      {((role == "admin") || (role == "manager")) &&(
                      <div className="flex flex-row justify-center items-center gap-3">
                        <button className="bg-white border-2 font-bentonreg border-[#541A83] text-[#541A83] h-8 w-36 rounded-2xl"onClick={()=> {router.push(`/editAward/${id}`)}}>Edit</button>
                        <button className="bg-red-500 w-36 h-8 text-white font-bentonreg rounded-2xl"onClick={()=>setDeleteWindow(true)}>Delete</button>
                      </div>
                      )}

                  </div>    
                      </motion.div>
                    <div>
                    </div>
                </div>
              </>
        )}
          <div>
        </div>
        </div>
        </div>
        </main>
    </>
    
);}
