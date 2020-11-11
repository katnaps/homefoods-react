import React, { useState, useEffect } from 'react';
import WebContent from '../containers/WebContent'
import axios from 'axios';



export default () => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY
    const [random, setRandom] = useState([])

    useEffect(() => {
        axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10`)
        .then(response => {
            console.log(response.data.recipes)
            setRandom(response.data.recipes)
        })
    }, [])

    return (
        <>
            <WebContent random={random} />
        </>
    )
}