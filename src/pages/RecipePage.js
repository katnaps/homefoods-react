import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { Link, Redirect, useParams } from 'react-router-dom';
import SessionContext from '../contexts/SessionContext'
import { toast } from 'react-toastify';

import RecipeCard from '../components/RecipeCard';

import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import SearchContext from '../contexts/SearchContext';

import 'bootstrap/dist/css/bootstrap.min.css';

import ScrollToTop from 'react-scroll-up';


export default () => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY
    const { isLoggedIn } = useContext(SessionContext)

    // const {searchResult} = useContext(SearchContext)


    const [searchResult, setSearchResult] = useState("")

    const [isRecipes, setRecipes] = useState([])

    const [count, setCount] = useState(10)
    const [showCount, setShowCount] = useState(false)


    const getRecipes = (e) => {
        e.preventDefault()
        if (searchResult !== "") {
            axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${searchResult}&number=${count}`)
                .then(response => {
                    // console.log(response)
                    // console.log(response.data)
                    setRecipes(response.data)
                    setShowCount(true)
                })
        } else {
            toast.warn('Please fill in ingredient', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    // useEffect(() => {
    // //    moreSearch()
    // }, [])


    if (!isLoggedIn || !localStorage.getItem("token")) {
        return <Redirect to="/" />
    }

    const moreSearch = () => {
        setCount(count + 10)
        axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${searchResult}&number=${count}`)
            .then(response => {
                // console.log(response)
                // console.log(response.data)
                setRecipes(response.data)
            })
    }

    const handleSearch = (e) => {
        setSearchResult(e.target.value)
    }




    return (
        <>
            <Container className="mt-4">
                <Form onSubmit={getRecipes}>
                    <InputGroup className="mb-3">
                        <FormControl
                            className="text-center"
                            onChange={handleSearch}
                            placeholder="Input Ingredient"
                            aria-label="Input Ingredient"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button
                                variant="success"
                                type="submit"
                            >
                                Look up recipe
                    </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </Container>

            <ScrollToTop showUnder={160}>
                <Button variant="danger">UP</Button>
            </ScrollToTop>
            <RecipeCard isRecipes={isRecipes} />

            <Container className="mt-4">
                {
                    showCount ?
                        <Nav className="justify-content-center mb-4">
                            <Button variant="warning" onClick={moreSearch}>More</Button>
                        </Nav>
                        : null
                }
            </Container>
        </>
    )
}



// <input onChange={handleSearch} type="text" />

// <br />
// <Button variant="success" onClick={getRecipes}>Get Search</Button>


// {
//     isRecipes.map(recipe => (
//         <div key={recipe.id}>
//             <img src={recipe.image} width="250" />
//             <p>{recipe.title}</p>
//             <button>
//                 <Link to={{
//                     pathname: `/recipe/${recipe.id}`,
//                     recipe: {
//                         id: recipe.id,
//                         title: recipe.title,
//                         image: recipe.image
//                     }
//                 }}>Get Recipe</Link>
//             </button>
//         </div>
//     ))
// }