import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import SessionContext from '../contexts/SessionContext'
import SearchContext from '../contexts/SearchContext'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Redirect } from "react-router-dom"

import { toast } from 'react-toastify';


export default () => {
	const API_KEY = process.env.REACT_APP_SPOON_API_KEY


	const { openLogin, openSignUp, isLoggedIn, setLogin } = useContext(SessionContext)

	const handleLogout = () => {
		localStorage.removeItem("token")
		setLogin(false)
		toast.info('🌮 You have successfully logged out!', {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}



return (
	<Navbar bg="dark" variant="dark" expand="md" fixed="top">
		<Navbar.Brand><Link to="/" style={{ color: "white", textDecoration: "none" }}>HomeFoods</Link></Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
			{
				isLoggedIn ?
					<>
						<Nav className="mr-auto">
							<Nav.Link><Link to="/users/me" style={{ color: "#9A9DA0", textDecoration: "none" }}>Profile</Link></Nav.Link>
							<Nav.Link><Link to="/food/" style={{ color: "#9A9DA0", textDecoration: "none" }}>Upload Food Image</Link></Nav.Link>
						</Nav>

						<Button className="mx-2 my-2" variant="primary">
							<Link to='/recipes/' style={{ color: "white", textDecoration: "none" }}>Search</Link></Button>

					</>
					: null

			}
			{

				isLoggedIn ? <Button className="mx-2 my-2" variant="danger" onClick={handleLogout}>Logout</Button>
					:
					<>
						<Button variant="primary" onClick={openLogin} className="mx-2">Login</Button>
						<Button variant="success" onClick={openSignUp} className="mx-2">Sign Up</Button>
					</>
			}
		</Navbar.Collapse>
	</Navbar>


)
}

	// {/* <h2>Navbar</h2>
		// <Link to="/" >Home</Link>
		// {
		// 	isLoggedIn ?
		// 		<>
		// 			<Link to="/users/me" >Profile</Link>
		// 			<Link to="/recipes/" >Search for Recipes</Link>
		// 			<Link to="/food/" >Upload Food Image</Link>
		// 		</>
		// 		: null
		// }
		// {
		// 	isLoggedIn ? <button onClick={handleLogout}>Logout</button> :
		// 		<>
		// 			<button onClick={openSignUp}>Sign Up</button>
		// 			<button onClick={openLogin}>Login</button>
		// 		</>
		// } */}