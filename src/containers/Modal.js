import React, { useState } from 'react'
import SignUp from './Signup'
import Login from './Login'
import SessionContext from '../contexts/SessionContext'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

const modalStyle = {
	height: "80vh",
	width: "80vh",
	border: "1px solid black",
	backgroundColor: "white",
	position: "absolute"
}

const modalContainerStyle = {
	display: "flex",
	justifyContent: "center"
}


export default ({ children }) => {
	const [isOpen, setOpen] = useState(false)
	const [isLoginForm, setIsLoginForm] = useState(true)
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
	}

	const openSignUp = () => {
		setOpen(true)
		setIsLoginForm(false)
	}

	const renderForm = () => {
		if (isLoginForm) {
			return <Login setLogin={setLogin} setOpen={setOpen} />
		} else {
			return <SignUp setLogin={setLogin} setOpen={setOpen} />
		}
	}

	const renderContent = () => {
		return (
			<SessionContext.Provider value={{ openLogin, openSignUp, close, isLoggedIn, setLogin }}>
				{
					isOpen ?
						<Modal.Dialog>
							<Modal.Header closeButton>
								<Modal.Title>Modal title</Modal.Title>
							</Modal.Header>

							<Modal.Body>
								<p>Modal body text goes here.</p>
							</Modal.Body>

							<Modal.Footer>
								<Button variant="secondary">Close</Button>
								<Button variant="primary">Save changes</Button>
							</Modal.Footer>
						</Modal.Dialog>
					// <div style={modalContainerStyle}>
					// 	<div style={modalStyle}>
					// 		{renderForm()}
					// 		<button onClick={() => close()}>X</button>
					// 	</div>
					// </div> 
					: null
				}
				{children}
			</SessionContext.Provider>
		)
	}

	return (
		renderContent()
	)

}


