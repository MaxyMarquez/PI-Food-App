import React from 'react'
import img from '../../assets/sad-chef.png'
import './error.css'

const Error = () => {
    return (
        <div className='error__container'>
            <img src={img} alt="" />
            <h2>Uuupss!<br /> Recipe not found</h2>
        </div>
    )
}

export default Error