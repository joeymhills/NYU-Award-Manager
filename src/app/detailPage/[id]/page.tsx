"use client"

import "@uploadthing/react/styles.css";
import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { accolade } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DotPulse, DotWave, NewtonsCradle, Ring } from "@uiball/loaders";
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
}

return(
    <>
      <div className="h-px bg-white"/>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#f5b246] to-[#501685]">
        <div className="container flex flex-col items-center justify-center w-9/12 ">
        <Link className="hover:cursor-pointer py-4" href={'/'}>
          <svg width="142.5px" height="60px" viewBox="0 0 129 55" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <path d="M46.775,11.088 C46.792,11.071 46.804,11.054 46.78,11.016 C46.746,10.961 46.658,10.842 46.471,10.571 C46.236,10.232 44.796,8.231 42.924,6.539 C41.046,4.842 35.359,0 26.319,0 C16.9,0 10.512,5.138 7.221,8.815 C4.005,12.406 2.398,16.363 2.354,16.474 C2.309,16.584 2.29,16.608 2.336,16.627 C2.386,16.647 2.401,16.574 2.46,16.466 C2.521,16.354 4.203,12.679 7.845,9.692 C11.489,6.703 17.56,3.258 26.412,3.258 C33.971,3.258 39.416,5.945 41.909,7.442 C44.402,8.938 45.993,10.426 46.338,10.748 C46.539,10.935 46.643,11.028 46.697,11.073 C46.734,11.104 46.757,11.103 46.775,11.088" id="Fill-1"></path>
            <path d="M0.157,25.239 C0.179,25.242 0.195,25.244 0.202,25.261 C0.219,25.301 0.207,25.398 0.206,25.605 C0.205,25.76 0.022,30.157 2.26,34.785 C4.568,39.556 8.657,44.546 15.192,47.812 C21.411,50.923 27.434,51.373 31.976,50.873 C36.345,50.392 39.701,48.753 40.07,48.6 C40.22,48.538 40.249,48.501 40.265,48.532 C40.268,48.538 40.271,48.549 40.267,48.558 C40.254,48.585 40.2,48.623 40.113,48.697 C39.99,48.801 39.791,48.967 39.527,49.166 C39.016,49.551 37.996,50.478 34.566,51.934 C29.654,54.019 21.422,55.334 13.202,50.881 C5.318,46.61 1.789,39.219 0.593,33.578 C-0.308,29.324 0.082,25.757 0.093,25.469 C0.102,25.367 0.101,25.306 0.11,25.273 C0.118,25.247 0.133,25.238 0.157,25.239" id="Fill-3"></path>
            <path d="M87.296,33.292 C87.368,33.299 87.436,33.3 87.505,33.299 L89.192,33.445 C91.271,33.593 91.372,33.888 91.372,34.397 C91.372,35.051 90.488,35.474 89.12,35.474 C87.197,35.474 86.802,35.002 86.802,34.294 C86.802,33.927 86.973,33.583 87.296,33.292 Z M89.015,24.023 C90.116,24.023 90.347,25.02 90.347,25.857 C90.347,27.036 89.862,27.712 89.015,27.712 C87.856,27.712 87.683,26.55 87.683,25.857 C87.683,25.172 87.856,24.023 89.015,24.023 Z M83.798,34.833 C83.798,36.661 85.297,37.371 88.659,37.371 C92.184,37.371 94.462,36.077 94.462,33.912 C94.462,31.774 93.137,30.921 89.739,30.691 L88.3,30.622 C87.465,30.533 87.432,30.344 87.432,30.146 C87.432,30.072 87.453,29.959 87.616,29.813 C88.049,29.914 88.512,29.965 88.994,29.965 C91.773,29.965 93.5,28.359 93.5,25.774 C93.5,25.378 93.434,24.975 93.301,24.546 C93.874,24.442 94.371,24.442 94.622,24.442 L94.796,24.442 L94.796,21.52 L94.603,21.541 C93.796,21.629 92.823,22.06 92.176,22.609 C91.402,21.923 90.305,21.561 88.994,21.561 C86.207,21.561 84.405,23.215 84.405,25.774 C84.405,27.119 84.93,28.266 85.891,29.031 C85.096,29.612 84.593,30.424 84.593,31.15 C84.593,31.726 84.84,32.215 85.311,32.578 C84.294,33.165 83.798,33.904 83.798,34.833 Z M51.77,44.111 L46.797,44.111 L46.797,38.179 L43.268,38.179 L43.268,53.77 L46.797,53.77 L46.797,47.095 L51.77,47.095 L51.77,53.77 L55.298,53.77 L55.298,38.179 L51.77,38.179 L51.77,44.111 Z M79.199,53.77 L82.644,53.77 L82.644,39.307 L79.199,39.765 L79.199,53.77 Z M73.737,50.403 C73.173,50.921 72.571,51.182 71.944,51.182 C71.382,51.182 71.073,50.85 71.073,50.248 C71.073,49.592 71.381,48.775 73.737,48.227 L73.737,50.403 Z M77.078,50.876 L77.078,45.918 C77.078,43.272 75.898,42.04 73.367,42.04 C71.364,42.04 69.573,42.676 68.189,43.882 L68.066,43.989 L69.671,46.096 L69.809,45.995 C70.407,45.554 71.588,44.815 72.781,44.815 C73.469,44.815 73.737,45.125 73.737,45.918 L73.737,46.232 C69.697,46.993 67.732,48.492 67.732,50.813 C67.732,52.772 68.787,53.895 70.627,53.895 C71.885,53.895 72.912,53.453 73.753,52.546 C73.786,53.028 73.871,53.369 73.953,53.646 L73.991,53.77 L77.425,53.77 L77.338,53.535 C77.151,53.028 77.078,52.282 77.078,50.876 Z M67.581,29.924 C67.018,30.442 66.415,30.704 65.789,30.704 C65.226,30.704 64.917,30.372 64.917,29.77 C64.917,29.113 65.226,28.297 67.581,27.748 L67.581,29.924 Z M67.835,33.292 L71.27,33.292 L71.182,33.056 C70.995,32.549 70.921,31.803 70.921,30.397 L70.921,25.439 C70.921,22.793 69.743,21.561 67.212,21.561 C65.208,21.561 63.417,22.198 62.034,23.403 L61.911,23.51 L63.515,25.618 L63.654,25.516 C64.252,25.076 65.432,24.337 66.626,24.337 C67.313,24.337 67.581,24.646 67.581,25.439 L67.581,25.754 C63.541,26.515 61.576,28.014 61.576,30.335 C61.576,32.294 62.631,33.417 64.47,33.417 C65.729,33.417 66.756,32.974 67.596,32.067 C67.63,32.549 67.714,32.89 67.797,33.167 L67.835,33.292 Z M79.771,21.561 C78.414,21.561 77.294,22.28 76.619,23.02 L76.619,21.791 L73.173,21.791 L73.173,33.292 L76.619,33.292 L76.619,25.432 C77.288,24.83 77.883,24.525 78.39,24.525 C78.822,24.525 79.22,24.661 79.22,25.648 L79.22,33.292 L82.644,33.292 L82.644,24.665 C82.644,22.634 81.651,21.561 79.771,21.561 Z M88.976,38.465 L85.552,38.921 L85.552,42.27 L83.963,42.27 L83.963,44.899 L85.552,44.899 L85.552,50.813 C85.552,53.089 86.485,53.895 89.116,53.895 C89.813,53.895 90.847,53.815 91.091,53.742 L91.215,53.705 L91.215,51.092 L90.972,51.197 C90.859,51.246 90.425,51.308 90.121,51.308 C89.179,51.308 88.976,51.083 88.976,50.039 L88.976,44.899 L91.362,44.899 L91.362,42.27 L88.976,42.27 L88.976,38.465 Z M113.596,21.561 C112.238,21.561 111.119,22.28 110.444,23.02 L110.444,21.791 L106.999,21.791 L106.999,33.292 L110.444,33.292 L110.444,25.432 C111.112,24.83 111.708,24.525 112.215,24.525 C112.646,24.525 113.045,24.661 113.045,25.648 L113.045,33.292 L116.469,33.292 L116.469,24.665 C116.469,22.634 115.475,21.561 113.596,21.561 Z M122.952,24.274 C123.278,24.274 124.253,24.274 124.438,26.373 L121.389,26.373 C121.557,25.017 122.108,24.274 122.952,24.274 Z M125.544,29.344 L125.44,29.509 C125.027,30.168 124.216,30.872 123.182,30.872 C122.084,30.872 121.487,30.089 121.36,28.479 L127.603,28.479 L127.603,27.74 C127.603,23.813 125.908,21.561 122.952,21.561 C120.652,21.561 117.965,23.13 117.965,27.552 C117.965,31.29 119.861,33.521 123.036,33.521 C124.962,33.521 126.433,32.744 127.531,31.144 L127.623,31.011 L125.544,29.344 Z M99.484,42.04 C98.127,42.04 97.006,42.758 96.332,43.499 L96.332,37.486 L92.887,37.946 L92.887,53.77 L96.332,53.77 L96.332,45.911 C97.001,45.309 97.596,45.004 98.104,45.004 C98.535,45.004 98.933,45.139 98.933,46.127 L98.933,53.77 L102.358,53.77 L102.358,45.143 C102.358,43.113 101.364,42.04 99.484,42.04 Z M100.287,30.808 C99.58,30.808 98.64,30.471 98.64,27.552 C98.64,25.342 99.148,24.358 100.287,24.358 C100.993,24.358 101.932,24.689 101.932,27.552 C101.932,29.804 101.425,30.808 100.287,30.808 Z M100.287,21.561 C98.861,21.561 97.636,22.042 96.747,22.953 C95.717,24.006 95.196,25.552 95.196,27.552 C95.196,31.953 97.826,33.521 100.287,33.521 C102.748,33.521 105.378,31.953 105.378,27.552 C105.378,25.555 104.853,24.007 103.819,22.952 C102.926,22.042 101.705,21.561 100.287,21.561 Z M61.929,44.753 C62.255,44.753 63.229,44.753 63.415,46.852 L60.366,46.852 C60.534,45.496 61.085,44.753 61.929,44.753 Z M64.418,49.988 C64.004,50.646 63.193,51.35 62.159,51.35 C61.061,51.35 60.463,50.567 60.337,48.958 L66.581,48.958 L66.581,48.218 C66.581,44.292 64.884,42.04 61.929,42.04 C59.629,42.04 56.942,43.609 56.942,48.03 C56.942,51.768 58.838,54 62.012,54 C63.939,54 65.41,53.222 66.508,51.623 L66.599,51.49 L64.521,49.822 L64.418,49.988 Z M46.797,27.74 L46.797,17.46 L43.415,17.46 L43.415,27.593 C43.415,29.669 42.829,30.515 41.392,30.515 C39.937,30.515 39.37,29.691 39.37,27.573 L39.37,17.46 L35.841,17.46 L35.841,27.761 C35.841,31.597 37.694,33.543 41.35,33.543 C45.015,33.543 46.797,31.644 46.797,27.74 Z M18.105,26.559 C16.986,24.326 13.467,17.858 13.3,17.551 L13.25,17.46 L9.688,17.46 L9.688,33.292 L12.923,33.292 L12.923,23.953 C14.075,26.14 17.884,32.882 18.065,33.203 L18.115,33.292 L21.341,33.292 L21.341,17.46 L18.105,17.46 L18.105,26.559 Z M60.118,30.328 L55.348,30.328 L55.348,17.46 L51.819,17.46 L51.819,33.292 L60.118,33.292 L60.118,30.328 Z M30.401,33.292 L30.401,27.068 L34.873,17.46 L31.388,17.46 L28.72,23.764 L26.053,17.46 L22.422,17.46 L26.873,27.088 L26.873,33.292 L30.401,33.292 L30.401,33.292 Z" id="Fill-4"></path>
          </svg>
        </Link>
        <div className="flex z-10 min-h-screen w-screen flex-col items-center ">
            <Link href={`/search?q=${callbackUrl}`}>
            <button className={'bg-white drop-shadow-2xl font-bentonbold text-sm text-[#541A83] lg:text-md py-0 w-36 h-8 rounded-lg'}>Return to search</button>
            </Link>
        {loading && (
        <div className="w-full flex mt-8 flex-row justify-center items-center">
        <Ring
              size={80}
              // lineWeight={5}
              speed={2} 
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
                  <div className=" flex flex-col gap-6 justify-center relative align-middle w-200 bg-white rounded-lg border-2 p-5 m-4 text-2xl font-bentonbold">
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
                      <div>
                          <Link className="rounded-lg bg-white px-5 py-2 text-md font-bentonreg text-gray-900 drop-shadow-md ring-1 ring-inset
                          ring-gray-300 hover:cursor-pointer hover:bg-gray-50"
                            href={form.imgurl1}>Download link</Link>
                       </div>
                        <img src={form.imgurl1} className="h-24 w-24"/>
                      </div>)}

                      {((role == "admin") || (role == "manager")) &&(
                      <div className="flex flex-row justify-center items-center gap-3">
                        <button className="bg-white border-2 font-bentonreg border-[#541A83] text-[#541A83] h-8 w-36 rounded-2xl"onClick={()=> {router.push(`/editAward/${id}`)}}>Edit</button>
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
