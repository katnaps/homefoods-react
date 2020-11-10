import React, { useState } from 'react';
import WebContent from '../containers/WebContent.js'
import axios from 'axios'

export default () => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY
    const [isIngredient, setIngredient] = useState("")
    const [isRecipes, setRecipes] = useState([])

    const getRecipes = (e) => {
        e.preventDefault();
        axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${isIngredient}&number=2`)
            .then(response => {
                console.log(response.data)
                setRecipes(response.data)
            })
    }

    const ingredientInput = (e) => {
        setIngredient(e.target.value)
    }


    return (
        <>
            <WebContent />
            <input onChange={ingredientInput} type="text" />
            <button onClick={getRecipes}>Get Search</button>
            {
                isRecipes.map(recipe => (
                    <div key={recipe.id}>
                        <img src={recipe.image} width="200" />
                        <p>{recipe.title}</p>
                    </div>
                ))
            }

        </>
    )
}