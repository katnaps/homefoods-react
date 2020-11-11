import React, { useState } from 'react';
import WebContent from '../containers/WebContent'
import axios from 'axios'
import Alert from '../components/Alert'
import { Link } from 'react-router-dom';
import Recipe from './Recipe';

export default () => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY
    const [queryOne, setQueryOne] = useState("")
    const [queryTwo, setQueryTwo] = useState("")
    const [queryThree, setQueryThree] = useState("")
    const [isRecipes, setRecipes] = useState([])
    const [alert, setAlert] = useState("")

    // const getRecipesThree = (e) => {
    //     if(queryOne !=="" && queryTwo !=="" && queryThree !=="") {
    //         axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${queryOne},+${queryTwo},+${queryThree}&number=10`)
    //             .then(response => {
    //                 console.log(response.data)
    //                 setRecipes(response.data)
    //             })
    //     } else {
    //         setAlert("Please fill in ingredients")
    //     }
    // }

    const getRecipes = (e) => {
        if(queryOne !=="") {
            axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${queryOne}&number=10`)
                .then(response => {
                    console.log(response.data)
                    console.log(response)
                    setRecipes(response.data)
                })
        } else {
            setAlert("Please fill in ingredients")
        }
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
            <WebContent />
            {alert !==""&& <Alert alert={alert}/>}
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
            {
                isRecipes.map(recipe => (
                    <div key={recipe.id}>
                        <img src={recipe.image} width="200" />
                        <p>{recipe.title}</p>
                        <button>
                            <Link to={{
                                pathname: `/recipe/${recipe.id}`,
                                recipe: { id: recipe.id }
                        }}>Get Recipe</Link>
                        </button>
                    </div>
                ))
            }

        </>
    )
}