import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';

import {GoogleAPI,GoogleLogin} from 'react-google-oauth'



export default ({ setLogin, setOpen, openSignUp}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    

    const handleLogin = (e) => {
		e.preventDefault()

        if(username !== "" && password !== "") {
            
            axios.post("https://homefoods1.herokuapp.com/api/v1/login/", {
                username,
                password
            })
                .then(response => {
                    
                    if(response.data.status == "success"){

                        localStorage.setItem("token", response.data.token)
                        setOpen(false)
                        setLogin(response.data.token)
                        toast.info('🥙 Welcome back!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    } else {
                        toast.error('🍋 Please Fill correct credentials', {
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
                .catch(err => {
                    console.log(err)
                })

        } else {
            toast.error('🥗 Please Fill in credentials', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    const googleLogin = (e) => {
		e.preventDefault()
        axios.get("https://homefoods1.herokuapp.com/api/v1/login/google_login")
		.then(resp => {
			localStorage.setItem("token", resp.data.auth_token)
			setOpen(false)
			setLogin(resp.data.auth_token)
            toast('🦄 Google signin works!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
		})
	}

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <>
            <Form onSubmit={handleLogin} className="m-3" >
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={handleUsername} value={username} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePassword} value={password} />
                </Form.Group>
                <Button type="submit" variant="primary"  >
                    Login
                </Button>
                <p className="forgot-password text-right">
                    No account? 
                <Button className="ml-2" variant="success" onClick={openSignUp}>Sign up</Button>
                </p>
            </Form>
            <p className="text-center" style={{fontSize:'20px'}}>OR</p>
            <div className="text-center" style={{paddingBottom:'10px'}}>
            <GoogleAPI  >
              	<GoogleLogin disabled/>
            </GoogleAPI>   
            </div>
        </>
        )
    }


// {/* <input value={username} placeholder="Username" type="text" onChange={handleUsername} />
// <input value={password} placeholder="Password" type="password" onChange={handlePassword} />
// <button onClick={handleLogin}>Login</button> */}