import React, { useState } from 'react'
import SignUp from './Signup'
import Login from './Login'
import SessionContext from '../contexts/SessionContext'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import 'bootstrap/dist/css/bootstrap.min.css';


export default ({ children }) => {
	const [isOpen, setOpen] = useState(false)
	const [isLoginForm, setIsLoginForm] = useState(true)
	const [status, setStatus] = useState("")
	const [isLoggedIn, setLogin] = useState(localStorage.getItem("token"))

	const open = () => {
		setOpen(true)
	}


	const close = () => {
		setOpen(false)
	}

	const openLogin = () => {
		setOpen(true)
		setIsLoginForm(true)
		setStatus("Login")
	}

	const openSignUp = () => {
		setOpen(true)
		setIsLoginForm(false)
		setStatus("Sign Up")
	}

	const renderForm = () => {
		if (isLoginForm) {
			return <Login setLogin={setLogin} setOpen={setOpen}  openSignUp={openSignUp}/>
		} else {
			return <SignUp setLogin={setLogin} setOpen={setOpen} openLogin={openLogin}/>
		}
	}

	const renderContent = () => {
		return (
			<SessionContext.Provider value={{ openLogin, openSignUp, close, isLoggedIn, setLogin }}>
				
					<Modal show={isOpen} onHide={close}>
				
							<Modal.Header closeButton>
								<Modal.Title>{status}</Modal.Title>
							</Modal.Header>
							{renderForm()}

							{/* <Modal.Body>
								<p>Modal body text goes here.</p>
							</Modal.Body> */}

							<Modal.Footer>
								<Button variant="secondary" onClick={close}>Close</Button>
							</Modal.Footer>
					
						</Modal>
					
				{children}
			</SessionContext.Provider>
		)
	}

	return (
		renderContent()
	)

}


