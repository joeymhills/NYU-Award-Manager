import { AnimatePresence, motion } from "framer-motion";
import { NextApiResponse } from "next";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UploadButton } from "~/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useAtom } from "jotai";
import { showDetailPage } from "./atoms";

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

      const nextEditPage = () => {
        if (editPage < 4) {
          setEditPage(editPage + 1)
          console.log("meow")
        }
        return
      }

      const prevEditPage = () => {
        if (editPage > 1) {
          setEditPage(editPage - 1)
        }
        return
      }
    
      const [deleteWindow,setDeleteWindow] = useState(false)
      const [editWindow, setEditWindow] = useState(false)
      const [showDetail,setShowDetail] = useAtom(showDetailPage)


      const [form, setForm] = useState<FormData>({id: id, institution: institution, name: name, comments: comments, outcome: outcome, intSource: intSource, extSource: extSource,
      messaging: messaging, frequency: frequency, notifDate: notifDate, cmcontact: cmcontact, sourceatr: sourceatr, wherepubint: wherepubint, promotionlim: promotionlim, imgurl:imgurl})

      async function update(data: FormData) { 
        try {
          await fetch("https://please-work-beta.vercel.app//api/update",{
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
          await fetch("https://please-work-beta.vercel.app/api/delete",{
            body: JSON.stringify(id),
            headers: { 'Content-Type': 'Application/json'},
            method: 'POST'});
            notifyDelete()
        }
        catch (error) {
            console.log('error in DELETE request()')
        }
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
                                <p className="text-center font-bentonbold">Are you sure you want to delete this entry?<span className="font-bentonreg">(This action cannot be undone)</span></p>
                            </div>
                            <div className="flex flex-row justify-center gap-2">
                                <button className="bg-white border-2 border-[#541A83] rounded-2xl text-[#541A83] h-8 w-32" onClick={()=>setDeleteWindow(false)}>Cancel</button>
                                <button className="bg-red-500 rounded-2xl text-white h-8 w-32" onClick={()=>{deleteAccolade(id);setDeleteWindow(false)}}>Delete</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
              )}

              {editWindow &&(
            <motion.div className="flex fixed z-10 min-h-screen w-screen bg-black/50 flex-col items-center ">
            <motion.div
            className={'flex w-180 flex-col z-20 rounded-2xl m-12 items-center justify-center bg-slate-100'}>
              <div className="flex flex-col pt-2 items-center justify-center">
              <h1 className="font-bentonbold text-[#541A83] text-4xl py-4 "></h1>

              <form onSubmit = {e => { e.preventDefault(); handleSubmit(form)}}
               className="flex flex-col items-center justify-center w-150">
                
                <div className="grid grid-cols-2 gap-6">
                
                {(editPage == 1) && (
                <>
                <input 
                type="text" name="institution" value={form.institution} onChange ={e=> setForm({...form, institution: e.target.value})}
                className= "p-3 rounded-xl w-80" placeholder="Institution/Department">
                </input>

                <input 
                type="text" name="accolade" value={form.name} onChange ={e=> setForm({...form, name: e.target.value})}
                className= "p-3 rounded-xl w-80" placeholder="Accolade name">
                </input>

                <input 
                type="text" name="outcome" value={form.outcome} onChange ={e=> setForm({...form, outcome: e.target.value})}
                className= "p-3 rounded-xl w-80" placeholder="Related Outcome">
                </input>

                <input 
                type="text" name="intSource" value={form.intSource} onChange ={e=> setForm({...form, intSource: e.target.value})}
                className= "p-3 rounded-xl w-80" placeholder="Internal Source, Contact & Approvals">
                </input>
                </>
                )}
                {(editPage == 2) && (
                <>
                <input 
                type="text" name="frequency" value={form.frequency} onChange ={e=> setForm({...form, frequency: e.target.value})}
                className= "p-3 rounded-xl w-80" placeholder="Frequency">
                </input>

                <input 
                type="text" name="notifDate" value={form.notifDate} onChange ={e=> setForm({...form, notifDate: e.target.value})}
                className= "p-3 rounded-xl w-80" placeholder="Notification Date">
                </input>

                <input 
                type="text" name="cmcontact" value={form.cmcontact} onChange ={e=> setForm({...form, cmcontact: e.target.value})}
                className= "p-3 rounded-xl w-80" placeholder="C&M Service Line Contact">
                </input>

                <input 
                type="text" name="sourceatr" value={form.sourceatr} onChange ={e=> setForm({...form, sourceatr: e.target.value})}
                className= "p-3 rounded-xl w-80" placeholder="Source Attribution">
                </input>
                </>
                )}
                
                {(editPage == 3) && (
                <>
                <input 
                type="text" name="wherepubint" value={form.wherepubint} onChange ={e=> setForm({...form, wherepubint: e.target.value})}
                className= "p-3 rounded-xl w-80" placeholder="Where published internally?">
                </input>

                <input 
                type="text" name="promotionlim" value={form.promotionlim} onChange ={e=> setForm({...form, promotionlim: e.target.value})}
                className= "p-3 rounded-xl w-80" placeholder="Limitations on Promotion">
                </input>

                <textarea 
                name="extSource" value={form.extSource} onChange ={e=> setForm({...form, extSource: e.target.value})}
                className= "p-3 rounded-xl h-48 w-80" placeholder="External Source & Contact">
                </textarea>

                <textarea 
                name="messaging" value={form.messaging} onChange ={e=> setForm({...form, messaging: e.target.value})}
                className= "p-3 rounded-xl h-48 w-80" placeholder="Enter messaging">
                </textarea>
                </>
                )}
                {(editPage == 4) && (
                <>
                <textarea 
                name="comments" value={form.comments} onChange ={e=> setForm({...form, comments: e.target.value})}
                className= "p-3 rounded-xl h-48 w-80" placeholder="Enter any comments">
                </textarea>
                </>)}
                </div>

                <div className="w-150 flex flex-row justify-end px-10 py-3">
                  <div className="flex flex-row justify-between">
                    <div className="h-7 w-7 hover: cursor-pointer" onClick={prevEditPage}><ChevronLeftIcon/></div><div className="font-bentonreg text-lg">Page {editPage}/4</div><div className="h-7 w-7 hover: cursor-pointer" onClick={nextEditPage}><ChevronRightIcon/></div>
                  </div>
                </div>

                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res:any) => {
                    // Do something with the response
                    const response = (res[0])
                    setForm({...form, imgurl: response.fileUrl})
                    console.log(form)
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                <div className="flex flex-row justify-center items-center py-4 gap-3">
                  <button className="bg-white border-2 font-bentonreg border-[#541A83] text-[#541A83] h-8 w-36 rounded-2xl"onClick={()=>setEditWindow(false)}>Cancel</button>
                  <button className="bg-[#541A83] w-36 h-8 text-white font-bentonreg rounded-2xl"onClick={()=>{handleSubmit(form);setEditWindow(false)}}>Submit</button>
                </div> 
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
              </form>
              </div>
              </motion.div>
            <div>
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
                <div className="flex flex-row justify-center items-center gap-3">
                  <button className="bg-white border-2 font-bentonreg border-[#541A83] text-[#541A83] h-8 w-36 rounded-2xl"onClick={()=>setEditWindow(true)}>Edit</button>
                  <button className="bg-red-500 w-36 h-8 text-white font-bentonreg rounded-2xl"onClick={()=>setDeleteWindow(true)}>Delete</button>
                </div>
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