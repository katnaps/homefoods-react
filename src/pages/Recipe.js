import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import 'bootstrap/dist/css/bootstrap.min.css';

import ScrollToTop from 'react-scroll-up';


export default (recipe) => {
    const API_KEY = process.env.REACT_APP_SPOON_API_KEY
    const [isSteps, setSteps] = useState([])
    const [imageURL, setImageURL] = useState("")
    const [title, setTitle] = useState("")
    const [sourceURL, setSourceURL] = useState("")
    const [author, setAuthor] = useState("")
    const [cookTime, setCookTime] = useState("")



    let { id } = useParams()

    useEffect(() => {

        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
            .then(resp => {
                // console.log(resp.data)
                setImageURL(resp.data.image)
                setTitle(resp.data.title)
                setSourceURL(resp.data.sourceUrl)
                setAuthor(resp.data.sourceName)
                setCookTime(resp.data.cookingMinutes)
            })

        // https://spoonacular.com/food-api/docs#Get-Analyzed-Recipe-Instructions
        axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`)
            .then(response => {
                // console.log(response.data[0])

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
            <Container className="mt-4">
                <Jumbotron className="bg-dark mt-4 text-light">
                    <h1>{title}</h1>
                    <Image src={imageURL} fluid className=" rounded d-block mx-auto mt-3 mb-3" />
                    <h3>
                        Recipe Author: {author}
                    </h3>
                    <p className="font-weight-normal">Duration to make: {cookTime} minutes</p>
                    <p className="mt-4">
                        <Button variant="primary" href={sourceURL} target="_blank">Learn more</Button>
                    </p>
                </Jumbotron>
                <Container className="d-flex flex-column">
                    {
                        isSteps.map(steps => (
                            <CardGroup className="mb-3">
                                <Card bg="dark" text="light" key={steps.number} border="info" style={{ width: '18rem' }}>
                                    <Card.Header>Step: {steps.number}</Card.Header>
                                    <h6 className="m-2">Items:</h6>
                                    <Container className="d-flex flex-xl-row flex-lg-row flex-md-row flex-column">
                                        {
                                            steps.ingredients.map(ingredients => (
                                                <Card.Body className="p-1" key={ingredients.id}>
                                                    <ul>
                                                        <li>{ingredients.name}</li>
                                                    </ul>
                                                </Card.Body>
                                            ))
                                        }
                                    </Container>
                                    <Card.Footer>
                                        <Card.Text className="p-3">
                                            {steps.step}
                                        </Card.Text>
                                    </Card.Footer>
                                </Card>
                            </CardGroup>

                        ))
                    }
                </Container >
                <ScrollToTop showUnder={160}>
                    <Button variant="danger">
                        UP</Button>
                </ScrollToTop>
            </Container >
        </>
    )
}









// {/* <div key={steps.number}>
// <Button variant="warning" >Step: {steps.number}</Button>
// <h6>Items:</h6>
// {
// steps.ingredients.map(ingredients => (
//     <ul key={ingredients.id}>
//         <li>{`${ingredients.name} `}</li>
//     </ul>
// ))
// }
// <p>{steps.step}</p>
// </div> */}