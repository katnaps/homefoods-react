import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { Link, Redirect, useParams } from 'react-router-dom';
import SessionContext from '../contexts/SessionContext'
import { toast } from 'react-toastify';

import RecipeCard from '../components/RecipeCard';

import Button from 'react-bootstrap/Button'
import SearchContext from '../contexts/SearchContext';


export default () => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY
    const { isLoggedIn  } = useContext(SessionContext)

    // const {searchResult} = useContext(SearchContext)


    // const [queryOne, setQueryOne] = useState("")

	const [isRecipes, setRecipes] = useState([])



    // const getRecipes = (e) => {
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
    //     }
    // }

    // useEffect(() => {
    // }, [])


    if (!isLoggedIn || !localStorage.getItem("token")) {
        return <Redirect to="/" />
    }

    // const ingredInputOne = (e) => {
    //     setQueryOne(e.target.value)
    // }


    return (
        <>
            
{/*             
            <label>Ingredient 1:</label>
            <input onChange={ingredInputOne} type="text" />
    
            <br />
            <Button variant="success" onClick={getRecipes}>Get Search</Button> */}

            <RecipeCard isRecipes={isRecipes} />

          
        </>
    )
}


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