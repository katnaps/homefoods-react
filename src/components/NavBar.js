import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import SessionContext from '../contexts/SessionContext'
import SearchContext from '../contexts/SearchContext'
import axios from 'axios';

import RecipePage from '../pages/RecipePage'
import HomePage from '../pages/HomePage'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify';


import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Redirect } from "react-router-dom"


export default () => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY


	const { openLogin, openSignUp, isLoggedIn, setLogin  } = useContext(SessionContext)
	// const [searchResult, setSearchResult] = useState("")
	// const [showRand, setShowRand] = useState(false)
	
	// const [isRecipes, setRecipes] = useState([])

	// const getRecipes = (e) => {
	// 	// e.preventDefault()
    //     if (searchResult !== "") {
    //         axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${searchResult}&number=10`)
    //             .then(response => {
    //                 console.log(response)
    //                 console.log(response.data)
    //                 setRecipes(response.data)
    //             })
    //     } else {
    //         toast.warn('🦄 Please fill in ingredient', {
    //             position: "top-left",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             });
	// 	}
	
    // }

    // useEffect(() => {
	// 	getRecipes()
	// }, [])



	const handleLogout = () => {
		localStorage.removeItem("token")
		setLogin(false)
	}


	return (
		// <SearchContext.Provider value={{ searchResult, getRecipes, isRecipes, handleSearchResult, searchResult }}>
		<Navbar bg="dark" variant="dark" expand="md" fixed="top">
			<Navbar.Brand><Link to="/" style={{ color: "white", textDecoration: "none" }}>HomeFoods</Link></Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				{
					isLoggedIn ?
						<>
							<Nav className="mr-auto">
								<Nav.Link><Link to="/users/me" style={{ color: "#9A9DA0", textDecoration: "none" }}>Profile</Link></Nav.Link>
								{/* <Nav.Link><Link to='/recipes/' style={{ color: "#9A9DA0", textDecoration: "none" }}>Search for Recipes</Link></Nav.Link> */}
								<Nav.Link><Link to="/food/" style={{ color: "#9A9DA0", textDecoration: "none" }}>Upload Food Image</Link></Nav.Link>
							</Nav>
							{/* <Form inline> */}
								{/* <FormControl type="text" placeholder="Search" className="mr-sm-2"  onChange={handleSearchResult} /> */}
								<Button className="mx-2 my-2" variant="outline-info">
									<Link to='/recipes/' style={{ color: "#9A9DA0", textDecoration: "none" }}>Search</Link></Button>
							{/* </Form> */}
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
		/* <HomePage showRand={showRand} /> */
		/* <RecipePage isRecipes={isRecipes} getRecipes={getRecipes}/> */
		// 		{child}
		// </SearchContext.Provider>

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