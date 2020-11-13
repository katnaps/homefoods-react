import React, { useState, useEffect, useContext } from 'react';
import RandRecipeCard from '../components/RandRecipeCard'
import axios from 'axios';

import SearchContext from '../contexts/SearchContext'

export default ({showRand, setShowRand}) => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY
    const [random, setRandom] = useState([])


    useEffect(() => {
        axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10`)
        .then(response => {
            // console.log(response.data.recipes)
            setRandom(response.data.recipes)
        })
    }, [showRand, setShowRand])

    return (
        <>
            <RandRecipeCard random={random} />
        </>
    )
}