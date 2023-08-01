import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipes } from '../../redux/actions';
import './searchBar.css';
import FilterDiets from './FilterDiets/FilterDiets';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    const selectedDiet = useSelector((state) => state.selectedDiet);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchRecipes(title, selectedDiet));

    };

    const handleClearSearch = () => {
        setTitle('');
        dispatch(searchRecipes('', selectedDiet));
    };

    return (
        <div className="SearchBar">

            <form onSubmit={handleSubmit} className=''>
                <div className="SearchBar__inputContainer">
                    <h2>What would you like to eat?</h2>
                    <div className="input__searchBar">
                        <input
                            className="SearchBar__input"
                            type="text"
                            value={title}
                            onChange={handleChange}
                            placeholder="Search..."
                        />
                        <button type="submit" className="SearchBar__searchButton">
                        </button>
                        {title && (
                            <div className="SearchBar__results">
                                <button type="button" className="SearchBar__clearButton" onClick={handleClearSearch}>
                                    X
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SearchBar
