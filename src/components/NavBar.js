import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import SessionContext from '../contexts/SessionContext'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';

export default () => {

	const { openLogin, openSignUp, isLoggedIn, setLogin } = useContext(SessionContext)

	const handleLogout = () => {
		localStorage.removeItem("token")
		setLogin(false)
	}

	return (
		
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="#home">HomeFoods</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#home">Home</Nav.Link>
					<Nav.Link href="#features">Features</Nav.Link>
					<Nav.Link href="#pricing">Pricing</Nav.Link>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-info">Search</Button>
				</Form>
				</Navbar.Collapse>
			</Navbar>
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
		
	)
} 