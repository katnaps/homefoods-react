
import React, {useState} from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';

import { toast } from 'react-toastify';


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
			if(response.data.status == "failed") {
				toast('Details not unique', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				console.log(response)
				localStorage.setItem("token", response.data.token)
				setOpen(false)
				setLogin(response.data.token)
				toast('🦄 Successful signup!', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					});
			}
		})
	}

	const handleUsername = (e) => {
		setUsername(e.target.value)
	}

	const handleEmail = (e) => {
		setEmail(e.target.value)
	}

	const handlePassword = (e) => {
		setPassword(e.target.value)
	}

	const handleConfirm = (e) => {
		setPasswordConf(e.target.value)
	}

	return (
		<>
			 <Form className="m-3">
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={handleUsername} value={username} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={handleEmail} value={email} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePassword} value={password} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" onChange={handleConfirm} value={passwordConf} />
                </Form.Group>
                <Button variant="primary" onClick={handleSignUp} disabled={!email || !username || !password || !passwordConf || (password !== passwordConf)}>
                    Sign Up
                </Button>
            </Form>
		</>
	)
}


{/* <input value={username} type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
<input value={email} type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
<input value={password} type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
<input value={passwordConf} type="password" placeholder="Confirm Password" onChange={(e) => {setPasswordConf(e.target.value)}} />
<button onClick={handleSignUp} disabled={!email || !username || !password || !passwordConf || (password !== passwordConf)}>Sign Up</button> */}