import React from 'react'
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import 'bootstrap/dist/css/bootstrap.min.css';

export default ({ foodRelation }) => {

    return (
        <>
            <Row className="justify-content-center mt-4" >
                {
                    foodRelation.map(recipe => (
                        <Col key={recipe.id} lg="true" xs="true" className="mr-3 ml-3 mt-4">
                            <CardDeck >
                                <Card bg="dark" text="light" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={`https://spoonacular.com/recipeImages/${recipe.id}-240x150.${recipe.imageType}`} className="w-100" />
                                    <Card.Body>
                                            <Card.Title>
                                            { recipe.title.length < 15 ? `${recipe.title}` 
                                            : `${recipe.title.substring(0, 20)}...`
                                            }
                                            </Card.Title>
                                        <Button variant="primary" href={recipe.url} target="_blank">
                                            Get Recipe Info
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

