import React, { useState } from 'react';
import WebContent from '../containers/WebContent'


export default () => {
    
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

  

    return (
        <>
            <WebContent />
        </>
    )
}