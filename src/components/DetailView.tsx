import { AnimatePresence, motion } from "framer-motion";


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
}



const DetailView: React.FC<Props> = (
    {id,name,institution,outcome,extSource,intSource,messaging, 
    comments,frequency,notifDate,cmcontact,sourceatr,wherepubint,promotionlim}) => {
    return (
        <>
          <AnimatePresence>
            <motion.div className="flex fixed top-0 right-0 z-30 min-h-screen w-screen flex-col items-center bg-black/50 ">
              <motion.div className={`flex w-236 flex-col z-40 rounded-2xl m-7 items-center justify-center bg-slate-100`}>
               
            <button type="button" className="text-white text-5xl fixed top-0 right-0 m-6 z-20">X</button>

            <div className=" flex flex-col gap-6 justify-center align-middle w-236 bg-white rounded-lg border-2 p-10 text-5xl font-bentonbold">
                <div >{institution}</div> 
                {name !== "" && (<div className="font-bentonreg border-b-[2px] pb-4">{name}</div>)}
                {outcome !== "" && (<div className="font-bentonreg text-2xl"><span className="font-bentonbold">Outcome: </span>{outcome}</div>)}
                {intSource !== "" && (<div className="font-bentonreg text-2xl"><span className="font-bentonbold">Internal Source: </span>{intSource}</div>)}
                {extSource !== "" && (<div className="font-bentonreg text-2xl"><span className="font-bentonbold">External Source: </span>{extSource}</div>)} 
                {comments !== "" && (<div className="font-bentonreg text-2xl"><span className="font-bentonbold">Comments: </span>{comments}</div>)}
                {messaging !== "" && (<div className="font-bentonreg text-2xl"><span className="font-bentonbold">Messaging: </span>{messaging}</div>)}
                {frequency !== "" && (<div className="font-bentonreg text-2xl"><span className="font-bentonbold">Frequency: </span>{frequency}</div>)}
                {notifDate !== "" && (<div className="font-bentonreg text-2xl"><span className="font-bentonbold">Notification Date: </span>{notifDate}</div>)}
                {cmcontact !== "" && (<div className="font-bentonreg text-2xl"><span className="font-bentonbold">C&M Contact Line: </span>{cmcontact}</div>)}
                {sourceatr !== "" && (<div className="font-bentonreg text-2xl"><span className="font-bentonbold">Source Attribution: </span>{sourceatr}</div>)}
                {wherepubint !== "" && (<div className="font-bentonreg text-2xl"><span className="font-bentonbold">Where Published Internally: </span>{wherepubint}</div>)}
                {promotionlim !== "" && (<div className="font-bentonreg text-2xl"><span className="font-bentonbold">Limitations on Promotion: </span>{promotionlim}</div>)}
            </div>    
                </motion.div>
              <div>
              </div>
            </motion.div>
            </AnimatePresence>
        </>
    )
}
export default DetailView