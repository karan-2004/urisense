import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import ImageUploadForm from '../components/ImageForm'
import { Link } from 'react-router-dom'
import ImageResults from '../components/Result'

export default function Home() {
  
  const [username, setUsername] = useState("")
  const [isLoggedIn, setLoggedIn] = useState(false)
  
  useEffect (()=>{
    const checkLoggedInUser = async () =>{
      try{
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              "Authorization":`Bearer ${token}`
            }
          };
          setLoggedIn(true)
          setUsername(localStorage.getItem('userName'))
        }
        else{
          setLoggedIn(false);
          setUsername("");
        }
      }
      catch(error){
        setLoggedIn(false);
        setUsername("");
      }
    };
    checkLoggedInUser()
  }, [])

  const handleLogout = async () => {
    try{
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if(accessToken && refreshToken) {
        const config = {
          headers: {
            "Authorization":`Bearer ${accessToken}`
          }
        };
        await axios.post("https://karanraj1324.pythonanywhere.com/auth/token/logout/", {"refresh":refreshToken}, config)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem('userName')
        localStorage.removeItem('userId')
        setLoggedIn(false);
        setUsername("");
        console.log("Log out successful!")
      }
    }
    catch(error){
      console.error("Failed to logout", error.response?.data || error.message)
    }
  }
  return (
    <div>
      {isLoggedIn ? (
        <>
      <h2 className='text-amber-300'>Hi, {username}</h2>
      <button onClick={handleLogout}>Logout</button>
      <ImageUploadForm></ImageUploadForm>
      <ImageResults></ImageResults>
      </>
      ):(
      <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <h2>Please Login to test</h2>
      </>
    )}
    </div>
  )
}
