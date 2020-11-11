import React from 'react'
import { Link } from 'react-router-dom';

export default ({random}) => {

    return(
        <>
        {
            random.map(randomRecipe => (
                <div key={randomRecipe.id}>
                    <img src={randomRecipe.image} width="250" />
                    <h3>{randomRecipe.title}</h3>
                    <button>
                        <Link to={{
                            pathname: `/recipe/${randomRecipe.id}`,
                            recipe: {
                                id: randomRecipe.id,
                                title: randomRecipe.title,
                                image: randomRecipe.image
                            }
                        }}>Get Recipe</Link>
                    </button>
                </div>
            ))
        }
        </>
    )
}