import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipes } from '../../redux/actions';
import Nav from '../Nav/Nav'
import Pagination from '../Pagination/Pagination';
import SearchBar from '../Filters/SearchBar';
import LoadingPage from '../LoadingPage/LoadingPage';
import FilterDiets from '../Filters/FilterDiets/FilterDiets';
import './home.css';

const Home = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.isLoading);
    const recipes = useSelector(state => state.recipes);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDiet, setSelectedDiet] = useState('');

    useEffect(() => {
        dispatch(searchRecipes(searchTerm, selectedDiet));
    }, [dispatch, searchTerm, selectedDiet]);

    return (
        <div className='home__container'>
            {loading ? (
                <LoadingPage />
            ) : (
                <div className='home__components'>
                    <SearchBar
                        setSearchTerm={setSearchTerm}
                        setSelectedDiet={setSelectedDiet}
                    />
                    <FilterDiets />
                    <Pagination recipes={recipes} /> {/* Pasa el estado actualizado recipes como prop */}
                </div>
            )}
        </div>
    );
};

export default Home

