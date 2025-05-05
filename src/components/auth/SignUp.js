import axios from "axios";
import Navbar from "../Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [errorMsg,setErrorMsg]=useState()
    const navigate=useNavigate()

    function register(e){
        e.preventDefault()
       const user={
            name:name,
            email:email,
            password:password,
            password_confirmation:confirmPassword
        }

        axios.post("https://demo-blog.mashupstack.com/api/register",user).then(response=>{
            navigate("/login/")
            setErrorMsg('')
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMsg(Object.values(error.response.data.errors).join(' '))
            }else{
                setErrorMsg("Failed to Connect to Api")
            }
        }

        )
    }


    return(
        <div>
        <Navbar/>
        <div className="container">
        <div className="row">
        <div className="col-8 offset-2">
            <h1 className="text-center">Signup</h1>
            {errorMsg?(<div className="alert alert-danger">{errorMsg}</div>):('')}
        <form>
            <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}></input></div>
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <label>Confirm Password</label>
            <input type="password" className="form-control" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
            <button type="submit" className="btn btn-primary my-3" onClick={register}>SignUp</button>
        </form>
        </div>
        </div>
        </div>
        </div>
    )
}
export default SignUp;