import { useState } from "react"
import Navbar from "../Navbar"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { setUser } from "../../store/AuthSlice"
import { useDispatch } from "react-redux"

function LogIn(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [errorMsg,setErrorMsg]=useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()

    function handleLogin(event){
        event.preventDefault()
        var user={
            email:email,
            password:password
        }
        axios.post('https://demo-blog.mashupstack.com/api/login/',user).then(response=>{
            setErrorMsg("")
            const user={
                
                email:email,
                password:password,
                token:response.data.token

            }
            dispatch(setUser(user))
            navigate("/")
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMsg(Object.values(error.response.data.errors).join(''))
            }else if(error.response.data.message){
                setErrorMsg(error.response.data.message)
            }else{
                setErrorMsg("Login Failed")
            }
        })

    }



    
    return(
        <div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
            <div className="col-8 offset-2">
                
                <h1 className="text-center">Login</h1>
                {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:""}
            <form>
                <label>Email</label>
                <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button type="submit" className="btn btn-primary my-3" onClick={handleLogin}>Login</button>
            </form>

        </div></div></div>







        </div>
    )
}
export default LogIn