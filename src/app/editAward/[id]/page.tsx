"use client"

import { toast } from "react-toastify";
import EditServiceDropdown from "../../../components/editServiceDropdown";
import { UploadButton } from "~/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { motion } from "framer-motion";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ring } from "@uiball/loaders";
import { useAtomValue, useSetAtom } from "jotai";
import { editLocation, editService } from "~/components/atoms";
import EditLocationDropdown from "~/components/EditLocationDropdown";

export default function Page({ params }: { params: { id: string } }) {

const [loading, setLoading] = useState(true)
const [submiting, setSubmiting] = useState(false)
const getServiceLine = useAtomValue(editService)
const getLocation = useAtomValue(editLocation)

const router = useRouter();

interface props {
    serviceProp: string
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
    effectiveDate: string,
    expirationDate: string
  }

  const id = params.id
  const findid = JSON.stringify(id)

  const [form, setForm] = useState<FormData>({id: {id}, institution: '', name: '', serviceLine: '', comments: '', outcome: '', intSource: '', extSource: '',
  messaging: '', frequency: '', notifDate: '', cmcontact: '', sourceatr: '', wherepubint: '', promotionlim: '', imgurl1: '', imgurl2: '', imgurl3: '', imgurl4: '', effectiveDate: '',
  expirationDate: ''})


  const successToast = () => toast.success('Award successfully updated!', {
  position: "bottom-right",
  autoClose: 1700,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  theme: "colored"
    });

  const errorToast = () => toast.error('Error in submission.', {
  position: "bottom-right",
  autoClose: 1700,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  theme: "colored"
    });

  async function update(data: FormData) { 
    console.log(JSON.stringify(data))
    let response;
    try {
      response = await fetch("https://awards.up.railway.app/update",{
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'Application/json'},
        method: 'POST'})
    }
    catch (error) {
      console.log('error in POST request()')
    }
    if (response?.ok){
    successToast();
    }
    else {
    console.log("error in update api call")
    errorToast();
    }
  }

  useEffect(()=> {
    setForm({...form, serviceLine: getServiceLine})
  },[getServiceLine])

  useEffect(()=>{
  setForm({...form, institution: getLocation})
  },[getLocation])

  function editServiceFunc(){
  if(!loading){
    return(
    <div className="flex flex-col lg:flex-row gap-2 justify-center items-center pt-3">
    <EditLocationDropdown
      locationProp={form.institution}
    />
    <EditServiceDropdown 
      serviceProp={form.serviceLine}
    />
    </div>
    )}
  }

  async function handleSubmit() {
    try {
      setSubmiting(true)
      await update(form);
      router.push(`/detailPage/${id}`)
    } catch (error) {
      alert('error in submission, please try again')
    }
  }




 useEffect(()=> {
    const fetchAccolades = async (data:string) => {
    fetch("https://awards.up.railway.app/find", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "plain/text"
      }
    })
    .then(res => {
      return res.json()
    })
    .then(res => {
    setForm(res)
    setLoading(false)
    console.log(res)
  })
  }
  fetchAccolades(findid);
  },[])

const imgflag = (img:string) => {
  if(img == "") {
    return false
  }
  else if(img == null) {
    return false
  }
  else {
    return true
  }
}

return(
    <>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#f5b246] to-[#501685]">
        <div className="container flex flex-col items-center justify-center w-9/12 ">
        <div className="hover:cursor-pointer pt-20">
        </div>
    
        <div className="flex z-10 min-h-screen w-screen flex-col items-center">
        {loading && (
        <div className="w-full flex flex-row justify-center items-center">
        <Ring 
              size={80}
              lineWeight={5}
              speed={2} 
              color="white" 
              />
        </div>
        )}
        {!loading &&(
        <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: .5}}
        animate={{ opacity: 1 }}
          className={'flex lg:w-200 md:w-150 sm:w-128 w-96 flex-col z-20 rounded-2xl m-2 items-center justify-center mb-32 bg-white drop-shadow-xl'}>
                <div className="flex flex-col pt-3 items-center justify-center"> 
                  
                  <div className="flex flex-row 
                  lg:w-200 
                  md:w-150 
                  sm:w-128
                  w-96
                  relative justify-center items-center">
                    <h1 className="font-bentonbold text-black md:text-4xl text-3xl py-1 ">Edit award</h1>
                  </div>

                {editServiceFunc()}

                <form onSubmit = {e => { e.preventDefault(); handleSubmit()}}
                 className="flex flex-col items-center justify-center lg:w-200 md:w-150 sm:w-128 w-96">
                  
                  <div className="grid sm:grid-cols-2 gap-4 p-5">
               
                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">Award Name</label>
                      <textarea
                      name="accolade" value={form.name} onChange ={e=> setForm({...form, name: e.target.value})}
                      className= "p-3 rounded-xl drop-shadow-md border h-32 lg:w-96 md:72" placeholder="Award name">
                      </textarea> 
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">Related Outcome</label>
                  <textarea 
                  name="outcome" value={form.outcome} onChange ={e=> setForm({...form, outcome: e.target.value})}
                  className= "p-3  rounded-xl drop-shadow-md border h-32 lg:w-96 md:w-72" placeholder="Related Outcome">
                  </textarea>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">Internal Source, Contact & Approvals</label>
                  <textarea 
                  name="intSource" value={form.intSource} onChange ={e=> setForm({...form, intSource: e.target.value})}
                  className= "p-3 rounded-xl drop-shadow-md border h-32 lg:w-96 md:w-72" placeholder="Internal Source, Contact & Approvals">
                  </textarea>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">Frequency</label>                
                  <textarea 
                  name="frequency" value={form.frequency} onChange ={e=> setForm({...form, frequency: e.target.value})}
                  className= "p-3 rounded-xl drop-shadow-md border h-32 lg:w-96 md:w-72" placeholder="Frequency">
                  </textarea>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">Notification date</label>
                  <textarea 
                  name="notifDate" value={form.notifDate} onChange ={e=> setForm({...form, notifDate: e.target.value})}
                  className= "p-3 rounded-xl drop-shadow-md border h-32 lg:w-96 md:w-72" placeholder="Notification Date">
                  </textarea>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">C&M service line contact</label>
                  <textarea 
                  name="cmcontact" value={form.cmcontact} onChange ={e=> setForm({...form, cmcontact: e.target.value})}
                  className= "p-3 rounded-xl drop-shadow-md border h-32 lg:w-96 md:w-72" placeholder="C&M Service Line Contact">
                  </textarea>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">Source Attribution</label>
                  <textarea
                  name="sourceatr" value={form.sourceatr} onChange ={e=> setForm({...form, sourceatr: e.target.value})}
                  className= "p-3 rounded-xl drop-shadow-md border h-32 lg:w-96 md:w-72" placeholder="Source Attribution">
                  </textarea>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">Where published internally</label>
                  <textarea
                  name="wherepubint" value={form.wherepubint} onChange ={e=> setForm({...form, wherepubint: e.target.value})}
                  className= "p-3 rounded-xl drop-shadow-md border h-32 lg:w-96 md:w-72" placeholder="Where published internally?">
                  </textarea>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">Limitations on promotion</label>
                  <textarea 
                  name="promotionlim" value={form.promotionlim} onChange ={e=> setForm({...form, promotionlim: e.target.value})}
                  className= "p-3 rounded-xl drop-shadow-md border h-32 lg:w-96 md:w-72" placeholder="Limitations on Promotion">
                  </textarea>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">External source & contact</label>
                  <textarea 
                  name="extSource" value={form.extSource} onChange ={e=> setForm({...form, extSource: e.target.value})}
                  className= "p-3 rounded-xl h-32 drop-shadow-md border lg:w-96 md:w-72" placeholder="External Source & Contact">
                  </textarea>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">Enter messaging</label>
                  <textarea 
                  name="messaging" value={form.messaging} onChange ={e=> setForm({...form, messaging: e.target.value})}
                  className= "p-3 rounded-xl drop-shadow-md border h-32 lg:w-96 md:w-72" placeholder="Enter messaging">
                  </textarea>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">Enter any comments</label>
                  <textarea 
                  name="comments" value={form.comments} onChange ={e=> setForm({...form, comments: e.target.value})}
                  className= "p-3 rounded-xl h-32 drop-shadow-md border lg:w-96 md:w-72" placeholder="Enter any comments">
                  </textarea>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">Effective date</label>
                  <textarea 
                   name="effectiveDate" value={form.effectiveDate} onChange ={e=> setForm({...form, effectiveDate: e.target.value})}
                  className= "p-3 rounded-xl h-32 drop-shadow-md border lg:w-96 md:w-72" placeholder="MM/DD/YYYY">
                  </textarea>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                  <label className="font-bentonreg pl-2">Expiration date</label>
                  <textarea
                   name="expirationDate" value={form.expirationDate} onChange ={e=> setForm({...form, expirationDate: e.target.value})}
                  className= "p-3 rounded-xl h-32 drop-shadow-md border lg:w-96 md:w-72" placeholder="MM/DD/YYYY">
                  </textarea>
                  </div>
                  </div>

              <div className="lg:w-200 md:w-150 w-96 justify-center pb-2 flex flex-row items-center">
              <div className="text-black text-center font-bentonreg py-1 text-sm sm:text-xl sm:py-2 sm:mx-16">Choose images for upload</div>
              </div>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res:any) => {
                  // Do something with the response
                  const response = (res[0])
                  
                  if(!imgflag(form.imgurl1)) {
                  setForm({...form, imgurl1: response.fileUrl})
                  }

                  else if (!imgflag(form.imgurl2)) {
                  setForm({...form, imgurl2: response.fileUrl})
                  }

                  else if (!imgflag(form.imgurl3)) {
                  setForm({...form, imgurl3: response.fileUrl})
                  }

                  else if(!imgflag(form.imgurl4)) {
                    setForm({...form, imgurl4: response.fileUrl})
                  }
                  
                  else {
                    alert("Upload limit reached");
                  }
                  console.log(form)

                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
              
              {/* Displays images that have been umploaded */}
              <div className="flex flex-row gap-2">
                
              {imgflag(form.imgurl1) && (
                <div className="">
                  <img src={form.imgurl1} className="h-24" alt="" />
                  <div onClick={()=>{setForm({...form, imgurl1: ""})}} className=" hover:cursor-pointer pt-1 flex flex-row justify-center items-center"> <TrashIcon className="h-5"/> </div>
                </div>)}
                
                {imgflag(form.imgurl2) && (
                <div className="">
                  <img src={form.imgurl2} className="h-24" alt="" />
                  <div onClick={()=>{setForm({...form, imgurl2: ""})}} className=" hover:cursor-pointer pt-1 flex flex-row justify-center items-center"> <TrashIcon className="h-5"/> </div>
                </div>)}

                {imgflag(form.imgurl3) && (
                <div className="">
                  <img src={form.imgurl3} className="h-24" alt="" />
                  <div onClick={()=>{setForm({...form, imgurl3: ""})}} className=" hover:cursor-pointer pt-1 flex flex-row justify-center items-center"> <TrashIcon className="h-5"/> </div>
                </div>)}
                
                {imgflag(form.imgurl4) && (
                <div className="">
                  <img src={form.imgurl4} className="h-24" alt="" />
                  <div onClick={()=>{setForm({...form, imgurl4: ""})}} className=" hover:cursor-pointer pt-1 flex flex-row justify-center items-center"> <TrashIcon className="h-5"/> </div>
                </div>)}

              </div>
              <button type="submit" onClick={() => {handleSubmit}} className="bg-[#541A83] flex justify-center items-center font-bentonbold text-xl text-white py-2 m-4 w-64 rounded-3xl">{!submiting ? "Update" : <Ring size={28} lineWeight={7} speed={2} color='white'/>}</button>
              
            </form>
            </div>
            </motion.div>
        )}
          <div>
        </div>
        </div>
        </div>
        </main>
    </>
    
);}
