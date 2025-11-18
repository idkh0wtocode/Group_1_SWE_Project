import LoginRegisterForm from "../components/LoginRegisterForm"

function Login() {
	return <LoginRegisterForm key="login" route="/api/token/" method="login" />
}

export default Login
