import React from 'react'
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'

import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import 'bootstrap/dist/css/bootstrap.min.css';

export default ({ random }) => {

    return (
        <>
            <Row className="justify-content-center mt-4" >
                {
                    random.map(randomRecipe => (
                        <Col key={randomRecipe.id} lg="true" xs="true" className="mr-3 ml-3 mt-4">
                            <CardDeck >
                                <Card bg="dark" text="light" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={randomRecipe.image} className="w-100" />
                                    <Card.Body>
                                            <Card.Title>
                                            { randomRecipe.title.length < 15 ? `${randomRecipe.title}` 
                                            : `${randomRecipe.title.substring(0, 20)}...`
                                            }
                                            </Card.Title>
                                        <Card.Text>
                                            { randomRecipe.diets[0] == null ? `no dietary info`
                                            : randomRecipe.diets[0]
                                            }
                                        </Card.Text>
                                        <Button variant="primary">
                                            <Link to={{
                                                pathname: `/recipe/${randomRecipe.id}`,
                                                recipe: {
                                                    id: randomRecipe.id,
                                                    title: randomRecipe.title,
                                                    image: randomRecipe.image
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

