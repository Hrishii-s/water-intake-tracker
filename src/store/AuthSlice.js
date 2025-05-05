import { createSlice } from "@reduxjs/toolkit";


export const AuthSlice=createSlice({
    name:"auth",
    initialState:{
        user:null
    },reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
            window.localStorage.setItem('user',JSON.stringify(action.payload))

        },removeUser:(state)=>{
            state.user=null
            window.localStorage.removeItem('user')
        },setUserFromLocalStorage:(state)=>{
            const user=window.localStorage.getItem('user')
            if (user){
                state.user=JSON.parse(user)
            }else{
                state.user=null
            }
        }



    }
})

export const {setUser,removeUser,setUserFromLocalStorage}=AuthSlice.actions
export default AuthSlice.reducer