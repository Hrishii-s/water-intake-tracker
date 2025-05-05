import { useEffect, useState } from "react"
import Navbar from "../Navbar"
import { checkAuth } from "../auth/checkAuth"
import { useSelector } from "react-redux"



function View(){
    const[listing,setListing]=useState([])
    const[quantity,setQuantity]=useState("")
    const datenow=new Date().toDateString()

    const[editingItemId,setEditingItemId]=useState(null)
    const[editedQuantity,setEditedQuantity]=useState("")

    const[selectedDate1,setSelectedDate1]=useState("")
    const[selectedDate2,setSelectedDate2]=useState("")
    const[quantityDiff,setQuantityDiff]=useState(null)

    const[currentPage,setCurrentpage]=useState(1)
    const itemsperpage=1
    const totalPage=Math.ceil(listing.length/itemsperpage)
    const indexOfFirstItem=(currentPage-1)*itemsperpage
    const indexOfLastItem=currentPage*itemsperpage
    const currentItems=listing.slice(indexOfFirstItem,indexOfLastItem)


    const user=useSelector(store=>store.auth.user)

    useEffect(()=>{
        if(user){
        const storedList=window.localStorage.getItem("listing_"+user.email)
        if(storedList){
            setListing(JSON.parse(storedList))
        }}

    },[user])



    const handleAdd=(e)=>{
        e.preventDefault()

        if(quantity.trim()===""){
            alert("Enter a valid quantity")
            return
        }

        const existingDate=listing.find(item=>item.date===datenow)
        if(existingDate){
            alert("Daily Limit Reached")
        }else{
        var newItem={
            id:listing.length+1,
            date:datenow,
            quantity:quantity
        }
        setListing([...listing,newItem])
        window.localStorage.setItem("listing_"+user.email,JSON.stringify([...listing,newItem]))
        setQuantity("")
    }}


 function handleEdit(list){
    setEditingItemId(list.id)
    setEditedQuantity(list.quantity)  
 }

 function handleSave(){
    if (editedQuantity.trim()!==""){
        const updatedListing=listing.map((list)=>{
            if(list.id===editingItemId){
                return {...list,quantity:editedQuantity}
            }
            return list
    })
    setListing(updatedListing)
    window.localStorage.setItem("listing_"+user.email,JSON.stringify(updatedListing))
    setEditingItemId(null)
    setEditedQuantity("")
    }
    else{
        alert("please enter a valid quantity")
    }
 }
 

 function handleCancel(){
    setEditingItemId(null)
    setEditedQuantity("")
 }

 const handleDelete=(listid)=>{
    
    const deletedListing=listing.filter((list)=>list.id!==listid)
    alert("You have the deleted data of " + listing.map((list)=>list.date))
    setListing(deletedListing)
    window.localStorage.setItem("listing_"+user.email,JSON.stringify(deletedListing))
 }

function handleCalculation(){
    if (selectedDate1===selectedDate2){

        alert("please select different dates for comparison")
    }
    const date1=listing.find((item)=>item.date===selectedDate1)
    const date2=listing.find((item)=>item.date===selectedDate2)
    if(date1&&date2){
        const difference=Math.abs(parseFloat(date1.quantity)-parseFloat(date2.quantity))
        setQuantityDiff(difference)
    }else{
        alert("please select valid date")
    }
}

function handleClear(){
    setSelectedDate1("")
    setSelectedDate2("")
    setQuantityDiff(null)
}




    return(

        <div>
           <Navbar/>
            <h1 className="text-center text-primary">Track Your Daily Water Intake</h1>

            <form className="row g-3 d-flex justify-content-center align-items-center mb-2" onSubmit={handleAdd}>    
                <div class="col-auto"><label>Add Quantity :</label></div>
                <div class="col-auto"><input className="form-control" type="text" value={quantity} onChange={(e)=>setQuantity(e.target.value)}></input></div>
                <div class="col-auto"><button type="submit" className="btn btn-success">Add</button></div>
            </form>



            <table className=" table  table-bordered  text-center">
            <thead className="table-success ">

                <tr> 
                    <th>ID</th>
                    <th>Date</th>
                    <th>Quantity(in Liters)</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody >
                {currentItems.map((list)=>(
                <tr key={list.id}>
                        <td>{list.id}</td>
                        <td>{list.date}</td>

                        {editingItemId===list.id?(

                        <input type="text"  value={editedQuantity} onChange={(e)=>setEditedQuantity(e.target.value)}></input>
                        ):(
                        <td>{list.quantity}</td>)}
                        <td>
                        {editingItemId===list.id?(
                            <>
                            <button type="submit" className="btn btn-success mx-2" onClick={handleSave}>Save</button>
                            <button type="submit" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                            </>

                        ):(

                       <button className="btn btn-primary" onClick={()=>handleEdit(list)}>edit</button>) }
                       </td>
                      <td> <button className="btn btn-warning" onClick={()=>handleDelete(list.id)}>delete</button></td>  
                </tr>

))}
            </tbody>
            </table>

<nav aria-label="Page navigation">
    <ul className="pagination justify-content-center">
        {currentPage>1&&(
            <li className="page-item">
                <button className="page-link" onClick={()=>setCurrentpage(currentPage-1)}>Previous</button>
            </li>
        )} 

{[...Array(totalPage)].map((_,index)=>(
    <li className={"page-item" +(currentPage===index+1?" active":"") }><button className="page-link" onClick={()=>setCurrentpage(index+1)}>{index+1}</button></li>
))}


    {currentPage<totalPage&&(
        <li>
            <button className="page-link" onClick={()=>setCurrentpage(currentPage+1)}>Next</button>
        </li>
    )}
    </ul>
</nav>






<div className="row g-3 d-flex justify-content-center align-items-center mb-4">
<div className="col-auto">
<label>Select date 1</label>
<select value={selectedDate1} className="form-select" onChange={(e)=>setSelectedDate1(e.target.value)}>
    <option value="">--select--</option>
    {listing.map((list)=>(
        <option  key={list.id} value={list.date}>{list.date}</option>
    ))}
</select>
</div>


<div className="col-auto">
    <label>Select date 2</label>
<select value={selectedDate2} className="form-select"onChange={(e)=>setSelectedDate2(e.target.value)}>
    <option>--select--</option>
    {listing.map((list)=>(
        <option>{list.date}</option>
    ))}
</select>
</div>
<div className="col-auto"><button className="btn btn-info mt-4" type="submit" onClick={handleCalculation}>Calculate</button></div>
</div>

{quantityDiff?(

  <div className="text-center">
    <h3>Difference in Quantity: {quantityDiff} Liters</h3> 
    <button className="btn btn-danger" onClick={handleClear}>Clear</button>
  </div>
 
):""}


        </div>
    )
}



export default checkAuth(View) 