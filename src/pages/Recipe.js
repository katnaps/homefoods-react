import Axios from 'axios'
import React, { useState, useEffect } from 'react'

export default (recipe) => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY
    const [isSteps, setSteps] = useState([])
    const [imageURL, setImageURL] = useState("")
    const [title, setTitle] = useState("")

    console.log(recipe.location.recipe.id)
    console.log(recipe.location.recipe.image)
    console.log(recipe.location.recipe.title)
    
    
    useEffect(() => {
        
        setImageURL(recipe.location.recipe.image)
        setTitle(recipe.location.recipe.title)
        const id = recipe.location.recipe.id

        Axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`)
        .then(response => {
            console.log(response.data[0])
            let steps = response.data[0].steps
            setSteps(steps)
        })
        // .catch(error => {
        //     console.log(error)
        // })
        // .then((data) => {
        //     console.log(data)

        //  
        // })

    }, [recipe])
    return (
        <div>
            
            <img src={imageURL} width="200" />
            <h1>{title}</h1>
            
            {
                isSteps.map(steps => (
                    <div key={steps.number}>
                        <h2>Step: {steps.number}</h2>
                        <h3>Ingredients</h3>
                        {
                            steps.ingredients.map(ingredients => (
                                <ul key={ingredients.id}>
                                <li>{`${ingredients.name} `}</li>
                                </ul>
                            ))
                        }
                        <p>{steps.step}</p>
                    </div>
                ))
            }
        </div>
    )
}
