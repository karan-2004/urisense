import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		password2: "",
	});

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

        try{
            const response = await axios.post("https://karanraj1324.pythonanywhere.com/auth/register/", formData)
            console.log("Success!", response.data)
            setSuccessMessage("Registration Successful!")
			navigate('/login');
        }
        catch(error){
            console.log("Error during registration!", error.response?.data);
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
					type="text"
					name="username"
					value={formData.username}
					onChange={handleChange}
				></input>{" "}
				<br />
				<br />
				<label>email:</label>
				<br />
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
				></input>{" "}
				<br />
				<br />
				<label>password:</label>
				<br />
				<input
					type="password"
					name="password"
					value={formData.password1}
					onChange={handleChange}
				></input>{" "}
				<br />
				<br />
				<label>confirm password:</label>
				<br />
				<input
					type="password"
					name="password2"
					value={formData.password2}
					onChange={handleChange}
				></input>{" "}
				<br />
				<br />
				<button type="submit" disabled={isLoading} onClick={handleSubmit} className="btn p-2">
					Register
				</button>
			</form>
		</div>
		</>
	);
}
