import React from "react"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Account from "../pages/Account"
import Products from "../pages/Products"

import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Link,
	useNavigate,
} from "react-router-dom"
// import Account from "../pages/Account"

const Navbar = () => {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.clear()
		navigate("/login")
	}

	return (
		<nav className="navbar navbar-expand-md bg-light navbar-light sticky-top shadow-sm">
			<div className="container">
				<Link className="navbar-brand" to="/">
					Super Mega Magic Marketplace
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						<>
							<li className="nav-item">
								<Link className="nav-link" to="/">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/account">
									My Account
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/register">
									Register
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/login">
									Login
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link btn btn-link"
									onClick={handleLogout}
								>
									Logout
								</Link>
							</li>

							<li className="nav-item">
								<Link className="nav-link" to="/reports">
									Report
								</Link>
							</li>

							<li className="nav-item">
								<Link className="nav-link" to="/products">
									Products
								</Link>
							</li>
						</>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
