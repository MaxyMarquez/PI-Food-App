import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

const Nav = () => {
    return (
        <nav className='nav__container'>
            <div className='searchBar__link'>
                <Link className='link__home' to='/home'>Home</Link>
                <Link className='link__create-recipe' to='/create_recipe'>Create a Recipe</Link>
            </div>
        </nav>
    )
}

export default Nav