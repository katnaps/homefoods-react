import React, {useState} from 'react'
import SignUp from './Signup'
import Login from './Login'
import SessionContext from '../contexts/SessionContext'

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
			<SessionContext.Provider value={{openLogin, openSignUp, close, isLoggedIn, setLogin}}>
				{
					isOpen ?
					<div style={modalContainerStyle}>
						<div style={modalStyle}>
							{renderForm()}
							<button onClick={() => close()}>X</button>
						</div>
					</div> :
					null
				}
				{children}
			</SessionContext.Provider>
		)
    }
    
    return (
        renderContent()
    )

}