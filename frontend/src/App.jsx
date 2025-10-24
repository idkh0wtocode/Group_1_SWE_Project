import React, { useState } from "react"
import axios from "axios" // It's often easier to use axios for HTTP requests in React

// Note: You might need to install axios: npm install axios or yarn add axios

function App() {
	// State to hold the form data
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		first_name: "",
		last_name: "",
		// 'dob' has been removed from here
	})

	const [message, setMessage] = useState("")
	const [isError, setIsError] = useState(false)

	// The base URL for your Django API. Adjust if needed.
	// Assuming your Django server runs on port 8000 and is accessible.
	const API_BASE_URL = "http://127.0.0.1:8000"
	const USERS_API_ENDPOINT = `${API_BASE_URL}/api/users/`

	// Handle input changes in the form
	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault()
		setMessage("")
		setIsError(false)

		try {
			// Your UserSerializer includes 'password' as write_only=True,
			// and the User model is a custom AbstractUser.
			// We send all required fields for creation.
			const response = await axios.post(USERS_API_ENDPOINT, formData)

			setMessage(`User created successfully! ID: ${response.data.id}`)
			console.log("Success Response:", response.data)

			// Optionally clear the form fields on success (except maybe password)
			setFormData({
				username: "",
				email: "",
				password: "", // Keep password clear for security, but might need to re-enter if using it for login later
				first_name: "",
				last_name: "",
				// 'dob' is no longer cleared here as it's not in state
			})
		} catch (error) {
			console.error(
				"Error creating user:",
				error.response ? error.response.data : error.message
			)
			setIsError(true)

			let errorMessage = "An unknown error occurred."

			// Handle specific errors from Django/DRF validation
			if (error.response && error.response.data) {
				// Format validation errors nicely
				const errors = Object.entries(error.response.data)
					.map(
						([field, messages]) =>
							`${field}: ${
								Array.isArray(messages)
									? messages.join(", ")
									: messages
							}`
					)
					.join(" | ")
				errorMessage = `Validation Failed: ${errors}`
			}

			setMessage(`Error: ${errorMessage}`)
		}
	}

	return (
		<div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
			<h1>Create New User</h1>

			{message && (
				<div
					style={{
						padding: "10px",
						marginBottom: "15px",
						borderRadius: "5px",
						backgroundColor: isError ? "#f8d7da" : "#d4edda",
						color: isError ? "#721c24" : "#155724",
						border: isError
							? "1px solid #f5c6cb"
							: "1px solid #c3e6cb",
					}}
				>
					{message}
				</div>
			)}

			<form
				onSubmit={handleSubmit}
				style={{ display: "grid", gap: "10px" }}
			>
				<label>
					Username:
					<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Email:
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Password:
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					First Name:
					<input
						type="text"
						name="first_name"
						value={formData.first_name}
						onChange={handleChange}
					/>
				</label>

				<label>
					Last Name:
					<input
						type="text"
						name="last_name"
						value={formData.last_name}
						onChange={handleChange}
					/>
				</label>

				{/* DOB input field is removed */}

				<button
					type="submit"
					style={{ marginTop: "15px", padding: "10px" }}
				>
					Register User
				</button>
			</form>
		</div>
	)
}

export default App
