import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"
// import LoadingIndicator from "./LoadingIndicator"
import { Form, Button } from "react-bootstrap"

function LoginRegisterForm({ route, method }) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const name = method === "login" ? "Login" : "Register"

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()

		try {
			// const res = await api.post(route, { username, password })

			let data = { username, password } // Base data for both login and register
			if (method !== "login") {
				// If it's a registration form, add the email to the data
				data = {
					...data,
					first_name: firstName,
					last_name: lastName,
					email,
				}
			}

			// Use the 'data' object which now correctly includes email for registration
			const res = await api.post(route, data)

			if (method === "login") {
				localStorage.setItem(ACCESS_TOKEN, res.data.access)
				localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
				navigate("/")
			} else {
				navigate("/login")
			}
		} catch (error) {
			alert(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		// <form onSubmit={handleSubmit} className="form-container">
		// 	<h1>{name}</h1>
		// 	<input
		// 		className="form-input"
		// 		type="text"
		// 		value={username}
		// 		onChange={(e) => setUsername(e.target.value)}
		// 		placeholder="Username"
		// 	/>
		// 	<input
		// 		className="form-input"
		// 		type="password"
		// 		value={password}
		// 		onChange={(e) => setPassword(e.target.value)}
		// 		placeholder="Password"
		// 	/>

		// 	<input
		// 		className="form-input"
		// 		type="email"
		// 		value={email}
		// 		onChange={(e) => setEmail(e.target.value)}
		// 		placeholder="Email"
		// 	/>

		// 	<input
		// 		className="form-input"
		// 		type="text"
		// 		value={firstName}
		// 		onChange={(e) => setFirstName(e.target.value)}
		// 		placeholder="First Name"
		// 	/>
		// 	<input
		// 		className="form-input"
		// 		type="text"
		// 		value={lastName}
		// 		onChange={(e) => setLastName(e.target.value)}
		// 		placeholder="Last Name"
		// 	/>
		// 	{loading && <LoadingIndicator />}
		// 	<button className="form-button" type="submit">
		// 		{name}
		// 	</button>
		// </form>
		<form onSubmit={handleSubmit} className="form-container">
			<h1>{name}</h1>
			<input
				className="form-input"
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			<input
				className="form-input"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>

			{/* --- CONDITIONAL RENDERING LOGIC --- */}
			{method !== "login" && (
				<>
					<input
						className="form-input"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
					/>
					<input
						className="form-input"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First Name"
					/>
					<input
						className="form-input"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Last Name"
					/>
				</>
			)}
			{/* --- END OF CONDITIONAL RENDERING --- */}

			{loading && (
				<div className="text-center py-2">
					<span>Loading...</span>
				</div>
			)}
			<button className="form-button" type="submit" disabled={loading}>
				{loading ? "Loading..." : name}
			</button>
		</form>
	)
}

export default LoginRegisterForm
