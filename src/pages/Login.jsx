import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
      username :"",
      password:""
    })

    const navigate = useNavigate();


    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
      e.preventDefault();
          if(isLoading){
              return
          }

          setIsLoading(true);

          function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        }

          try{
              const response = await axios.post("https://karanraj1324.pythonanywhere.com/auth/login/", formData)
              console.log("Success!", response.data)
              setSuccessMessage("Login Successful!")
              localStorage.setItem("accessToken", response.data.access);
              localStorage.setItem("refreshToken", response.data.refresh)
              const decoded = parseJwt(response.data.access)
              localStorage.setItem("userName", decoded.username)
              localStorage.setItem('userId', decoded.user_id)
              navigate('/')
          }
          catch(error){
              console.log("Error during Login!", error.response?.data);
              if(error.response && error.response.data){
                  Object.keys(error.response.data).forEach(field => {
                      const errorMessages = error.response.data[field];
                      if(errorMessages && errorMessages.length > 0){
                          setError(errorMessages);
                      }
                  })
              }
          }
          finally{
              setIsLoading(false)
          }

    };

      return (
        <>

        <div className="flex w-vw h-[70vh] justify-center items-center">
          <form className="form">
            {error && <p style={{color:"red"}}>{error}</p>}
            { successMessage && <p style={{color:"green"}}>{successMessage}</p>}
            <label>username:</label>
            <br />
            <input
              type="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            ></input>{" "}
            <br />
            <br />
            <label>password:</label>
            <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            ></input>{" "}
            
            <br />
            <br/>
            <button type="submit" disabled={isLoading} onClick={handleSubmit} className="btn p-2">
              Login
            </button>
          </form>
        </div>
        </>
      )
}
