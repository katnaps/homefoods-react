import React from 'react'
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import 'bootstrap/dist/css/bootstrap.min.css';

export default ({ isRecipes }) => {

    return (
        <>
            <Row className="justify-content-center mt-4" >
                {
                    isRecipes.map(recipe => (
                        <Col key={recipe.id} lg="true" xs="true" className="mr-3 ml-3 mt-4 mb-4">
                            <CardDeck >
                                <Card bg="dark" text="light" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={recipe.image} className="w-100" />
                                    <Card.Body>
                                            <Card.Title>
                                            { recipe.title.length < 15 ? `${recipe.title}` 
                                            : `${recipe.title.substring(0, 20)}...`
                                            }
                                            </Card.Title>
                                        <Card.Text>
                                            Likes: {recipe.likes}
                                        </Card.Text>
                                        <Button variant="primary">
                                            <Link to={{
                                                pathname: `/recipe/${recipe.id}`,
                                                recipe: {
                                                    id: recipe.id,
                                                    title: recipe.title,
                                                    image: recipe.image
                                                }
                                            }} style={{ color: "white" }}>Get Recipe</Link>
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </CardDeck>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

