import React from 'react'
import './card.css'
import { Link } from 'react-router-dom'
import StarRating from '../StarRating/StarRating'

const Card = (props) => {
    return (
        <div className='card__container'>
            <div className='card__image'>
                <img src={props.image} alt="" />
                <div className='card__score'>
                    <StarRating score={props.healthScore} />
                </div>
            </div>
            <div className='card__diets'>
                {
                    props.diets?.map(diet => (
                        <p key={diet}>
                            {diet.charAt(0).toUpperCase() + diet.slice(1)}
                        </p>
                    ))
                }
            </div>

            <div className='card__title'>
                <h2>{props.title}</h2>
            </div>
            <Link className='card__button' to={`/recipe/${props.id}`} >View Recipe</Link>
        </div>
    )
}

export default Card