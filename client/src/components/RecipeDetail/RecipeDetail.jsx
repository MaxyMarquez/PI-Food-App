import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getRecipeByID, deleteRecipe } from '../../redux/actions';
import LoadingPage from '../LoadingPage/LoadingPage';
import Modal from '../Modal/Modal';
import './recipeDetail.css'

const RecipeDetail = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const recipe = useSelector(state => state.recipeDetail);

    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getRecipeByID(id))
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch]);

    const handleModal = () => {
        setModalVisible(true);
    }
    const handleDelete = () => {
        dispatch(deleteRecipe(id))
    }
    return (
        <div className='recipe-detail__container'>
            {
                loading ? (
                    <LoadingPage />
                ) : (
                    <div className='recipe-detail'>

                        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                            <div className='recipe-detail__modal'>
                                <h2>Are you sure you want to DELETE this recipe?</h2>
                                <div className='modal-details__button'>
                                    <Link onClick={handleDelete} to='/home'>Yes</Link>
                                    <button onClick={() => setModalVisible(false)}>No</button>
                                </div>
                            </div>
                        </Modal>

                        <div className='recipe-detail__title'>
                            <h2>{recipe.title}</h2>
                            {
                                recipe.hasOwnProperty('created') ? (
                                    <div>
                                        <button className='button-delete' onClick={handleModal}></button>
                                        <button className='button-edit'></button>
                                    </div>
                                ) : null
                            }
                        </div>

                        <span className='recipe__line'></span>

                        <div className='recipe-detail__header'>
                            <div className='recipe-detail__img'>
                                <img src={recipe.image} alt="" />
                                <p>ID: {recipe.id}</p>
                            </div>

                            <div className='recipe-detail__summary'>
                                <h2>Summary</h2>
                                <p>{recipe.summary?.replace(/<[^>]*>/g, '')}</p>
                            </div>
                        </div>

                        <span className='recipe__line'></span>

                        <div className='recipe-detail__ingrediets'>
                            <div className='ingredients__info'>
                                <h2><span>Ingredients</span></h2>
                                <span className='recipe__line'></span>
                                <div className='ingredients'>
                                    {recipe.ingredients?.map(ingredient => (
                                        <ul key={ingredient}>
                                            <span><li>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</li></span>
                                        </ul>
                                    ))}
                                </div>
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
                        </div>


                        <span className='recipe__line'></span>


                    </div>
                )
            }
        </div >

    )
}

export default RecipeDetail