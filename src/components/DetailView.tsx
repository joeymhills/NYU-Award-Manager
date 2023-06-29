import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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


const DetailView: React.FC<Props> = (
    {id,name,institution,outcome,extSource,intSource,messaging, 
    comments,frequency,notifDate,cmcontact,sourceatr,wherepubint,promotionlim,imgurl}) => {
    
      const [deleteWindow,SetDeleteWindow] = useState(false)
      
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
          await fetch("http://localhost:3000/api/delete",{
            body: JSON.stringify(id),
            headers: { 'Content-Type': 'Application/json'},
            method: 'DELETE'});
            console.log('id is: ', id)
            notifyDelete()
        }
        catch (error) {
            console.log('error in DELETE request()')
        }
    }

      return (
        <>
          <AnimatePresence>
            <motion.div className="flex fixed top-0 right-0 z-30 min-h-screen w-screen flex-col items-center bg-black/50 ">  

              {deleteWindow &&(
                <motion.div className="flex fixed top-0 right-0 z-30 min-h-screen w-screen flex-col items-center">
                    <div className="w-96 h-54 z-80 p-5 m-2 bg-white border-2 border-slate-300 fixed rounded-2xl">
                        <div className="flex flex-col justify-center items-center gap-3"> 
                            <div>
                                <p className="text-center">Are you sure you want to delete this entry?(This action cannot be undone)</p>
                            </div>
                            <div className="flex flex-row justify-center gap-2">
                                <button className="bg-white border-2 border-[#541A83] rounded-2xl text-[#541A83] h-8 w-32" onClick={()=>deleteAccolade(id)}>Cancel</button>
                                <button className="bg-red-500 rounded-2xl text-white h-8 w-32" onClick={()=>SetDeleteWindow(false)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
              )}
             
            <div className=" flex flex-col gap-6 justify-center align-middle w-200 bg-white rounded-lg border-2 p-10 m-6 text-2xl font-bentonbold">
                <div >{institution}</div> 
                {name !== "" && (<div className="font-bentonreg border-b-[2px] pb-4">{name}</div>)}
                {imgurl !== null &&(<div className="flex flex-row font-bentonreg justify-center items-center text-lg"> <div><Link href={imgurl}>Download link</Link></div><img src={imgurl} className="h-36 w-36"/></div>)}
                {outcome !== "" && (<div className="font-bentonreg text-lg"><span className="font-bentonbold">Outcome: </span>{outcome}</div>)}
                {intSource !== "" && (<div className="font-bentonreg text-lg"><span className="font-bentonbold">Internal Source: </span>{intSource}</div>)}
                {extSource !== "" && (<div className="font-bentonreg text-lg"><span className="font-bentonbold">External Source: </span>{extSource}</div>)} 
                {comments !== "" && (<div className="font-bentonreg text-lg"><span className="font-bentonbold">Comments: </span>{comments}</div>)}
                {messaging !== "" && (<div className="font-bentonreg text-lg"><span className="font-bentonbold">Messaging: </span>{messaging}</div>)}
                {frequency !== "" && (<div className="font-bentonreg text-lg"><span className="font-bentonbold">Frequency: </span>{frequency}</div>)}
                {notifDate !== "" && (<div className="font-bentonreg text-lg"><span className="font-bentonbold">Notification Date: </span>{notifDate}</div>)}
                {cmcontact !== "" && (<div className="font-bentonreg text-lg"><span className="font-bentonbold">C&M Contact Line: </span>{cmcontact}</div>)}
                {sourceatr !== "" && (<div className="font-bentonreg text-lg"><span className="font-bentonbold">Source Attribution: </span>{sourceatr}</div>)}
                {wherepubint !== "" && (<div className="font-bentonreg text-lg"><span className="font-bentonbold">Where Published Internally: </span>{wherepubint}</div>)}
                {promotionlim !== "" && (<div className="font-bentonreg text-lg"><span className="font-bentonbold">Limitations on Promotion: </span>{promotionlim}</div>)}
                <div className="flex flex-row justify-center items-center gap-3">
                  <button className="bg-white border-2 font-bentonreg border-[#541A83] text-[#541A83] h-8 w-36 rounded-2xl"onClick={()=>SetDeleteWindow(true)}>Edit</button>
                  <button className="bg-red-500 w-36 h-8 text-white font-bentonreg rounded-2xl"onClick={()=>SetDeleteWindow(true)}>Delete</button>
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