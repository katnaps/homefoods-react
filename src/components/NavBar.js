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

	const { openLogin, openSignUp, isLoggedIn, setLogin,  } = useContext(SessionContext)

	const handleLogout = () => {
		localStorage.removeItem("token")
		setLogin(false)
	}

	return (

		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand><Link to="/" style={{ color: "white", textDecoration: "none" }}>HomeFoods</Link></Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				{
					isLoggedIn ?
						<>
							<Nav className="mr-auto">
								<Nav.Link><Link to="/users/me" style={{ color: "#9A9DA0", textDecoration: "none" }}>Profile</Link></Nav.Link>
								<Nav.Link><Link to="/recipes/" style={{ color: "#9A9DA0", textDecoration: "none" }}>Search for Recipes</Link></Nav.Link>
								<Nav.Link><Link to="/food/" style={{ color: "#9A9DA0", textDecoration: "none" }}>Upload Food Image</Link></Nav.Link>
							</Nav>
							<Form inline>
								<FormControl type="text" placeholder="Search" className="mr-sm-2" />
								<Button className="mx-2 my-2" variant="outline-info">Search</Button>
							</Form>
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