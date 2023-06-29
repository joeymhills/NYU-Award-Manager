interface props {
    id:string
}

const Deletewindow = (id:props) => {
    
    async function deleteAccolade(id:props) { 
        try {
          await fetch("http://localhost:3000/api/delete",{
            body: JSON.stringify(id),
            headers: { 'Content-Type': 'Application/json'},
            method: 'DELETE'});
        }
        catch (error) {
            console.log('error in DELETE request()')
        }
    }
        
    return(
    <div className="flex fixed top-0 right-0 z-30 min-h-screen w-screen flex-col items-center">
        <div className="w-96 h-54 z-80 p-5 m-2 drop-shadow-2xl bg-white border-2 border-[#541A83] fixed rounded-2xl">
            <div className="flex flex-col justify-center items-center gap-3"> 
                <div>
                    <p>Are you sure you want to delete?(This action cannot be undone)</p>
                </div>
                <div className="flex flex-row justify-center gap-2">
                    <button className="bg-white border-2 border-[#541A83] rounded-2xl text-[#541A83] h-8 w-32">Cancel</button>
                    <button className="bg-red-500 rounded-2xl text-white h-8 w-32" onClick={()=>deleteAccolade(id)}>Delete</button>
                </div>
            </div>
        </div>
    </div>
)}
export default Deletewindow