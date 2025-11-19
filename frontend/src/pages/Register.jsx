import LoginRegisterForm from "../components/LoginRegisterForm"

function Register() {
	return (
		<LoginRegisterForm
			key="register"
			route="/api/users/"
			method="register"
		/>
	)
}

export default Register
