import React from 'react'
import './star_rating.css'

const StarRating = ({ score }) => {

    const maxStars = 128;
    const starPercentage = (score / maxStars) * 100;
    const starPercentageRounded = Math.round(starPercentage);

    const StarStyles = () => {
        return {
            width: starPercentageRounded + "%"
        };
    };
    return (
        <div className="stars-gray">
            <div className="stars-yellow" style={StarStyles()}></div><span> {score}</span>

        </div>
    );
}

export default StarRating