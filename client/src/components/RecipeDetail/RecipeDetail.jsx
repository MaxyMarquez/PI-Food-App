import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getRecipeByID } from '../../redux/actions';
import './recipeDetail.css'
import LoadingPage from '../LoadingPage/LoadingPage';

const RecipeDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const recipe = useSelector(state => state.recipeDetail);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getRecipeByID(id))
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch]);

    return (
        <div className='recipe-detail__container'>
            {
                loading ? (
                    <LoadingPage />
                ) : (
                    <div >
                        <div className='recipe-detail__title'>
                            <h2>{recipe.title}</h2>
                        </div>

                        <span className='recipe__line'></span>

                        <div className='recipe-detail__header'>
                            <div className='recipe-detail__img'>
                                <img src={recipe.image} alt="" />
                            </div>

                            <div className='recipe-detail__summary'>
                                <h2>Summary</h2>
                                <p>{recipe.summary?.replace(/<[^>]*>/g, '')}</p>
                            </div>
                        </div>

                        <span className='recipe__line'></span>

                        <div className="recipe-detail__info">
                            <div className='recipe-detail__steps'>
                                <h2><span>Steps by sptes</span></h2>
                                <span className='recipe__line'></span>
                                <ul>
                                    {recipe.steps?.map((step, index) => (
                                        <li key={index}>
                                            <span className='step-number'>{index + 1} -</span> {step}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className='recipe-detail__ingrediets'>
                                <div className='ingredients__info'>
                                    <div className='clock__info'>
                                        <div className='clock'></div>
                                        <h2>{recipe.readyInMinutes}'</h2>
                                    </div>
                                    <div className='serving__info'>
                                        <div className='serving'></div>
                                        <h2>{recipe.servings}</h2>
                                    </div>
                                </div>
                                <span className='recipe__line'></span>
                                <h2><span>Ingredients</span></h2>
                                <span className='recipe__line'></span>
                                {recipe.ingredients?.map(ingredient => (
                                    <ul key={ingredient}>
                                        <span><li>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</li></span>
                                    </ul>
                                ))}
                            </div>
                        </div>


                        <span className='recipe__line'></span>


                    </div>
                )
            }
        </div>

    )
}

export default RecipeDetail