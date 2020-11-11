import Axios from 'axios'
import React, { useState, useEffect } from 'react'

export default (recipe) => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY
    const [isSteps, setSteps] = useState([])
    
    
    useEffect(() => {
        console.log(recipe.location.recipe.id)
        const id = recipe.location.recipe.id
        Axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`)
        .then(response => {
            console.log(response.data.[0].steps)
            setSteps(response.data.[0].steps)
        })
        // .catch(error => {
        //     console.log(error)
        // })
        // .then((data) => {
        //     console.log(data)

        //  
        // })

    }, [])
    return (
        <div>
            {
                isSteps.map(steps => (
                    <div key={steps.number}>
                        <h2>Step: {steps.number}</h2>
                        {
                            steps.ingredients.map(ingredients => (
                                <div key={ingredients.id}>
                                    <h3>Ingredients</h3>
                                <span>{`${ingredients.name} `}</span>
                                </div>
                            ))
                        }
                        <p>{steps.step}</p>
                    </div>
                ))
            }
        </div>
    )
}
