import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import SessionContext from '../contexts/SessionContext'

export default() => {

const {openLogin, openSignUp, isLoggedIn, setLogin} = useContext(SessionContext)

	const handleLogout = () => {
		localStorage.removeItem("token")
		setLogin(false)
	}

	return (
		<div>
		  <h2>Navbar</h2>
		  <Link to="/" >Home</Link>
		  {
			isLoggedIn ?
			<>
			<Link to="/users/me" >Profile</Link>
			<Link to="/recipes/" >Search for Recipes</Link>
			</>
		  	: null
		  }
		  {
		  	isLoggedIn ? <button onClick={handleLogout}>Logout</button> : 
		  	<>
		  		<button onClick={openSignUp}>Sign Up</button>
		  		<button onClick={openLogin}>Login</button>
		  	</>		  
		}
		</div>
	)
} 