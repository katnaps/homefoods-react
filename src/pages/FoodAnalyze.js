import React, { useState, useContext } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import SessionContext from '../contexts/SessionContext'
import axios from 'axios';

export default () => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY
    const { isLoggedIn } = useContext(SessionContext)
    const { id } = useParams()
    const [foodImg, setFoodImg] = useState(null)
    const [previewFood, setPreviewFood] = useState(null)
    const [foodRelation, setFoodRelation] = useState([])
    const [showText, setShowText] = useState(false)

    if (!isLoggedIn || (id === "me" && !localStorage.getItem("token"))) {
        return <Redirect to="/" />
    }
   
    const foodImage = (e) => {
        e.preventDefault()
        let foodInput = e.target
        const formFood = new FormData()
        formFood.append("file", foodImg)
        axios.post(`https://api.spoonacular.com/food/images/analyze?apiKey=${API_KEY}`, formFood)
            .then(response => {
                foodInput.value = null
                console.log(response.data.recipes)
                console.log(response.data)
                setFoodRelation(response.data.recipes)
                setShowText(true)
            })
    }



    const handleFoodImg = (e) => {
        setPreviewFood(URL.createObjectURL(e.target.files[0]))
        setFoodImg(e.target.files[0])
    }

    return (
        <div>
            <div>
                <img src={previewFood} width="200" />
                <form onSubmit={foodImage}>
                    <input type="file" onChange={handleFoodImg} />
                    <button type="submit">Upload</button>
                </form>
                {
                    showText ?
                    <h2>Related Food Recipes:</h2>
                    : null
                }
                {
                    foodRelation.map(recipe => (
                        <div key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <img src={`https://spoonacular.com/recipeImages/${recipe.id}-240x150.${recipe.imageType}`} width="250" />
                            <br />
                            <a href={recipe.url} target="_blank">Click for more info</a>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
