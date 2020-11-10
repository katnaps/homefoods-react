
import React, {useState} from 'react'
import axios from 'axios'

export default ({setOpen, setLogin}) => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConf, setPasswordConf] = useState("")

	const handleSignUp = (e) => {
		axios.post("https://homefoods1.herokuapp.com/api/v1/users/", {
			username,
			email,
			password
		})
		.then(response => {
            console.log(response)
			localStorage.setItem("token", response.data.token)
			setOpen(false)
			setLogin(response.data.token)
		})
	}

	return (
		<>
			<input value={username} type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
			<input value={email} type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
			<input value={password} type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
			<input value={passwordConf} type="password" placeholder="Confirm Password" onChange={(e) => {setPasswordConf(e.target.value)}} />
			<button onClick={handleSignUp} disabled={!email || !username || !password || !passwordConf || (password !== passwordConf)}>Sign Up</button>
		</>
	)
}