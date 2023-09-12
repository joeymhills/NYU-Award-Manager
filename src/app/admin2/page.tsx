"use client"
import { EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Ring } from "@uiball/loaders";
import axios from "axios";
import { motion } from "framer-motion"
import { useAtom } from "jotai/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import SearchInput from "~/SearchInput";
import { uFilter } from "~/components/atoms";

const admin = () => {

const router = useRouter()
// User Role Authentication
const [unassigned, setUnassigned] = useState([]);
const [userLoading, setUserLoading] = useState(true);
const [deletedLoading, setDeletedLoading] = useState(true);
const [recentLoading, setRecentLoading] = useState(true);

const [recentArray, setRecentArray] = useState([]);
const [userArray, setUserArray] = useState([]);
const [managerArray, setManagerArray] =  useState([]);
const [adminArray, setAdminArray] =  useState([]);
const [deletedAccolades, setDeletedAccolades] = useState([]);
const [deleteWindow,setDeleteWindow] = useState(false);
const [id,setId] = useState("id");
const [oldRole, setOldRole] = useState("role")
const [roleWindow, setRoleWindow] = useState(false)
const [roleChecked, setRoleChecked] = useState("loading")
const [manageUsers, setManageUsers] = useState(true)
const [showUnassigned, setShowUnassigned] = useState(true)
const [showUser, setShowUser] = useState(false)
const [showManager, setShowManager] = useState(false)
const [showAdmin, setShowAdmin] = useState(false)
const [showDeleted, setShowDeleted] = useState(false)

const [role, setRole ] = useState("loading")
const {data:session} = useSession()
useEffect(()=> {
  if(session) {
    setRole(session.user.role)
  }
  })

if((role == "manager") || (role == "user")) {
  router.push("/")
}

if (role == "unassigned") {
  router.push("/unauthorized")
}

function fetchDeleted(){
  axios.get("https://awards.up.railway.app/getdeleted")
  .then(res => {
    const resdata = res.data
    setDeletedAccolades(resdata)
    console.log(resdata)
    setDeletedLoading(false)
  })
  .catch(function (error) {
    console.log(error);
  });
}

useEffect(() => {
  fetchDeleted();
  },[]);

async function deleteAward() { 
  try {
    await fetch("/api/permDelete",{
      body: JSON.stringify(id),
      headers: { 'Content-Type': 'Application/json'},
      method: 'POST'});
      fetchDeleted();
  }
  catch (error) {
      console.log('error in DELETE request()')
  }
}

function getRecent(){
  fetch("https://awards.up.railway.app/recentawards", {
    method: "GET",
  })  
  .then(res => {
    return res.json()
})
  .then(res =>{
    setRecentArray(res)
    setRecentLoading(false)
    console.log(res)
  }
  )
  .catch(function (error) {
    console.log(error);
  });
}
useEffect(() => {
  getRecent()
  },[]);

function getUsers(){
  fetch("https://awards.up.railway.app/getusers", {
    method: "GET",
  })  
  .then(res => {
    return res.json()
})
  .then(res =>{
    setUserArray(res)
    setUserLoading(false)
    console.log(res)
  }
  )
  .catch(function (error) {
    console.log(error);
  });
}

useEffect(() => {
  getUsers()
  },[]);

const [userFilter,setUserFilter] = useAtom(uFilter)

useEffect(() => {
getUsers()
},[userFilter])

async function changeRole(roleId:string, role:string) {
  axios.post("/api/changeRole", {
    id: roleId,role
  })
  .then(res => {
    console.log('log from admin page', res.data)
    getUsers()
  })
  .catch(function (error) {
    console.log(error);
  });
}

function undoDelete(undoId: string){

  axios.post("/api/undoDelete", {
    undoId
  })
  .then(res => {
    const fake = res.data
    fetchDeleted()
  })
  .catch(function (error) {
    console.log(error);
  })};
return(
    <>
<main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#f5b246] to-[#501685]">

{userLoading && (

<div className="w-full flex flex-row justify-center items-center pt-44">
<Ring 
        size={80}
        lineWeight={5}
        speed={1.75} 
        color="white" 
        />
</div>
)}

{roleWindow &&(
  <motion.div
  initial={{ opacity: 0 }}
  transition={{ duration: .5, delay: 0 }}
  animate={{ opacity: 1 }}
  className="flex fixed top-0 right-0 z-[9000] min-h-screen bg-black/50 w-screen flex-col items-center">
      <div className="w-96 h-54 z-80 p-5 mt-24 bg-white fixed rounded-2xl">
          <div className="flex flex-col justify-center items-center gap-3"> 
              <div>
                <p>Which role would you like to assign?</p>
              </div>
              <div className="flex flex-col justify-center gap-2">
                  <button className="bg-white border-2 border-[#541A83] rounded-2xl text-[#541A83] h-8 w-32" onClick={()=>{setRoleWindow(false); changeRole(id, 'unassigned')}}>Unauthorized</button>
                  <button className="bg-white border-2 border-[#541A83] rounded-2xl text-[#541A83] h-8 w-32" onClick={()=>{setRoleWindow(false); changeRole(id, 'user')}}>User</button>
                  <button className="bg-white border-2 border-[#541A83] rounded-2xl text-[#541A83] h-8 w-32" onClick={()=>{setRoleWindow(false); changeRole(id, 'manager')}}>Manager</button>
                  <button className="bg-white border-2 border-[#541A83] rounded-2xl text-[#541A83] h-8 w-32" onClick={()=>{setRoleWindow(false); changeRole(id, 'admin')}}>Admin</button>
                  <button className="bg-white mt-5 border-2 border-black rounded-2xl text-black h-8 w-32" onClick={()=>{setRoleWindow(false)}}>Cancel</button>
              </div>
          </div>
      </div>
  </motion.div>
)}
{!userLoading && !deletedLoading && (
<div className="">
    <div className="w-screen min-h-screen pt-20 grid grid-cols-12 grid-rows-12 h-full gap-3 pb-5 px-4">

    <motion.div
    initial={{ opacity: 0 }}
    transition={{ duration: .5, delay: 0 }}
    animate={{ opacity: 1 }}
    className="py-3 flex justify-center items-center bg-white row-span-1 col-[span_12_/_span_12] rounded-lg w-full drop-shadow-xl">
        <SearchInput/>
    </motion.div>
    <motion.div
    initial={{ opacity: 0 }}
    transition={{ duration: .5, delay: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white row-[span_11_/_span_11] col-span-4 rounded-lg w-full drop-shadow-xl">
    <h1 className="font-bentonreg pl-3 text-2xl pt-3 pb-2 border-b">Recently Created</h1>
    <table className="table-auto w-full border-separate border-spacing-3 text-2xl bg-white rounded-lg">
        <tbody>
            {recentArray.map(id => {
                return(
                <tr>
                <td className="">{id.name}</td>
                <td>
                        <EllipsisHorizontalIcon className="-mr-1 h-9 w-9 text-black hover:cursor-pointer"/>
                </td>
                </tr>)}
            )}
        </tbody>
        </table>
    </motion.div>
        <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: .5, delay: .05 }}
        animate={{ opacity: 1 }}
        className="flex flex-col bg-white row-span-5 col-span-4 rounded-lg w-full drop-shadow-xl">
            <h1 className="font-bentonreg pl-3 text-2xl pt-3 pb-2 border-b">Unauthorized users</h1>
            <table className="table-auto w-full border-separate border-spacing-3 text-2xl bg-white rounded-lg">
                <tbody className="">
                    {userArray.map(id => {
                    if(id.role == 'unassigned'){
                        return(
                        <>
                        <tr className="">
                        <td className="">{id.name}</td>
                        <td>
                        <EllipsisHorizontalIcon onClick={() => {setId(id); setRoleWindow(true)}} className="-mr-1 h-9 w-9 text-black hover:cursor-pointer"/>
                        </td>
                        </tr>
                        </>
                        )}
                    else{
                        return null
                    }})}
                </tbody>
                </table>
        </motion.div>
        <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: .5, delay: .1 }}
        animate={{ opacity: 1 }}
        className="bg-white row-span-5 col-span-4 rounded-lg w-full drop-shadow-xl">
            <h1 className="font-bentonreg pl-3 text-2xl pt-3 pb-2 border-b">Users</h1>
            <table className="table-auto w-full border-separate border-spacing-3 text-2xl bg-white rounded-lg">
                <tbody>
                    {userArray.map(id => {
                    if(id.role == 'user'){
                        return(
                        <tr>
                        <td className="">{id.name}</td>
                        <td>
                        <EllipsisHorizontalIcon className="-mr-1 h-9 w-9 text-black"/>
                        </td>
                        </tr>)}
                    else{
                        return null
                    }})}
                </tbody>
                </table>
        </motion.div>

        <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: .5, delay: .1 }}
        animate={{ opacity: 1 }}
        className="bg-white row-span-5 col-span-4 rounded-lg w-full drop-shadow-xl">
            <h1 className="font-bentonreg pl-3 text-2xl pt-3 pb-2 border-b">Managers</h1>
            <table className="table-auto w-full border-separate border-spacing-3 text-2xl bg-white rounded-lg">
                <tbody>
                    {userArray.map(id => {
                    if(id.role == 'manager'){
                        return(
                        <tr>
                        <td className="">{id.name}</td>
                        <td>
                        <EllipsisHorizontalIcon onClick={() => {setId(id); setRoleWindow(true)}} className="-mr-1 h-9 w-9 text-black hover:cursor-pointer"/>
                        </td>
                        </tr>)}
                    else{
                        return null
                    }})}
                </tbody>
                </table>
        </motion.div>
        <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: .5, delay: .15 }}
        animate={{ opacity: 1 }}
        className="bg-white row-span-5 col-span-4 rounded-lg w-full drop-shadow-xl">
            <h1 className="font-bentonreg pl-3 text-2xl pt-3 pb-2 border-b">Admins</h1>
            <table className="table-auto w-full border-separate border-spacing-3 text-2xl bg-white rounded-lg">
                <tbody>
                    {userArray.map(id => {
                    if(id.role == 'admin'){
                        return(
                        <tr>
                        <td className="">{id.name}</td>
                        <td>
                        <EllipsisHorizontalIcon onClick={() => {setId(id); setRoleWindow(true)}} className="-mr-1 h-9 w-9 text-black hover:cursor-pointer"/>
                        </td>
                        </tr>)}
                    else{
                        return null
                    }})}
                </tbody>
                </table>
        </motion.div>
    </div>
</div>
    )}
    </main>
    </>
    )}
    export default admin;
