import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Alert from '../components/Alert';
import { Link, Redirect, useParams } from 'react-router-dom';
import SessionContext from '../contexts/SessionContext'

import RecipeCard from '../components/RecipeCard';

export default () => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY
    const { isLoggedIn } = useContext(SessionContext)
    const { id } = useParams()
    const [queryOne, setQueryOne] = useState("")
    const [queryTwo, setQueryTwo] = useState("")
    const [queryThree, setQueryThree] = useState("")
    const [isRecipes, setRecipes] = useState([])
    const [alert, setAlert] = useState("")



    const getRecipes = (e) => {
        if (queryOne !== "") {
            axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${queryOne}&number=10`)
                .then(response => {
                    console.log(response)
                    console.log(response.data)
                    setRecipes(response.data)
                })
        } else {
            setAlert("Please fill in ingredients")
        }
    }

    useEffect(() => {
        getRecipes()
    }, [])


    if (!isLoggedIn || (id === "me" && !localStorage.getItem("token"))) {
        return <Redirect to="/" />
    }

    const ingredInputOne = (e) => {
        setQueryOne(e.target.value)
    }

    const ingredInputTwo = (e) => {
        setQueryTwo(e.target.value)
    }

    const ingredInputThree = (e) => {
        setQueryThree(e.target.value)
    }

    return (
        <>

            {alert !== "" && <Alert alert={alert} />}
            <label>Ingredient 1:</label>
            <input onChange={ingredInputOne} type="text" />
            {/* <br />
            <label>Ingredient 2:</label>
            <input onChange={ingredInputTwo} type="text" />
            <br />
            <label>Ingredient 3:</label>
            <input onChange={ingredInputThree} type="text" /> */}
            <br />
            <button onClick={getRecipes}>Get Search</button>

            <RecipeCard isRecipes={isRecipes} />

            {/* {
                isRecipes.map(recipe => (
                    <div key={recipe.id}>
                        <img src={recipe.image} width="250" />
                        <p>{recipe.title}</p>
                        <button>
                            <Link to={{
                                pathname: `/recipe/${recipe.id}`,
                                recipe: {
                                    id: recipe.id,
                                    title: recipe.title,
                                    image: recipe.image
                                }
                            }}>Get Recipe</Link>
                        </button>
                    </div>
                ))
            } */}
        </>
    )
}