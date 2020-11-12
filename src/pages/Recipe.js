import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'



import 'bootstrap/dist/css/bootstrap.min.css';



export default (recipe) => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY
    const [isSteps, setSteps] = useState([])
    const [imageURL, setImageURL] = useState("")
    const [title, setTitle] = useState("")
    const [sourceURL, setSourceURL] = useState("")
    const [author, setAuthor] = useState("")
    let { id } = useParams()

    useEffect(() => {

        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
            .then(resp => {
                console.log(resp.data)
                setImageURL(resp.data.image)
                setTitle(resp.data.title)
                setSourceURL(resp.data.sourceUrl)
                setAuthor(resp.data.sourceName)
            })

        // https://spoonacular.com/food-api/docs#Get-Analyzed-Recipe-Instructions
        axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`)
            .then(response => {
                console.log(response.data[0])

                setSteps(response.data[0].steps)
            })
        // .catch(error => {
        //     console.log(error)
        // })
        // .then((data) => {
        //     console.log(data)

        //  
        // })

    }, [id])
    return (
        <>
            <Jumbotron className="bg-dark mt-4 text-light">
                <h1>{title}</h1>
                    <Image src={imageURL} fluid className=" rounded d-block mx-auto mt-3 mb-3" />
                <h3>
                    Recipe Author: {author}
                </h3>
                <p className="mt-4">
                    <Button variant="primary" href={sourceURL} target="_blank">Learn more</Button>
                </p>
            </Jumbotron>

            {
                isSteps.map(steps => (
                    <div key={steps.number}>
                        <h2>Step: {steps.number}</h2>
                        <h5>Ingredients</h5>
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
        </>
    )
}
