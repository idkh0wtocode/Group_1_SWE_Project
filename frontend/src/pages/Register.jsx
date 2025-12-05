import LoginRegisterForm from "../components/LoginRegisterForm"

function Register() {
	return (
		<LoginRegisterForm
			key="register"
			route="/api/register/"
			method="register"
		/>
	)
}

export default Register
