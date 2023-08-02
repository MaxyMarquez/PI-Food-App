import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipe } from '../../redux/actions';
import formValidation from './formValidations'
import Modal from '../Modal/Modal';

import './formNewRecipe.css'
import { Link } from 'react-router-dom';

const FormNewRecipe = () => {

    const dispatch = useDispatch();

    const recipes = useSelector(state => state.recipes);
    const diets = useSelector(state => state.diets);

    const [recipeName, setRecipeName] = useState('');
    const [recipeSummary, setRecipeSummary] = useState('');
    const [recipeHealthScore, setRecipeHealthScore] = useState(0)
    const [recipeImage, setRecipeImage] = useState('');
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState('');
    const [diet, setDiet] = useState([]);
    const [errors, setErrors] = useState({});
    const [errorStep, setErrorStep] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [editingStep, setEditingStep] = useState(null);
    const [editingStepIndex, setEditingStepIndex] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getDiets())
        const validations = formValidation({
            name: recipeName,
            image: recipeImage,
            summary: recipeSummary,
            steps: steps,
            diet: diet,
        }, recipes)
        setDisabled(isStepButtonDisabled);
        setErrorStep('')
        setErrors(validations);
    }, [dispatch, recipeName, recipeImage, recipeSummary, currentStep, steps, diet, disabled, errorStep, recipes])

    const handleAddStep = () => {
        setSteps([...steps, currentStep]);
        setCurrentStep('');
    };

    const isStepButtonDisabled = () => {
        if (currentStep.length < 10) {
            setErrorStep('* Your step of your recipe should be longer than 10 characters.')
            setDisabled(true)
        } else if (currentStep.length > 500) {
            setErrorStep('* Your step of your recipe should not be longer than 500 characters.')
            setDisabled(true)
        } else {
            setErrorStep('');
            setDisabled(false);
        }
    };

    const handleEditStep = (index) => {
        const stepToEdit = steps[index];
        setEditingStep(stepToEdit);
        setCurrentStep(stepToEdit);
        setEditingStepIndex(index);
    };

    const handleSaveStep = () => {
        if (editingStep && editingStepIndex !== -1) {
            const updatedSteps = [...steps];
            updatedSteps[editingStepIndex] = currentStep;
            setSteps(updatedSteps);
            setEditingStep(null);
            setEditingStepIndex(-1);
            setCurrentStep('')
        }
    };

    const handleDeleteStep = (index) => {
        setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
    };

    const handleDiets = event => {
        if (event.target.checked) {
            setDiet([...diet, event.target.value]);
        } else {
            setDiet(diet.filter(diet => diet !== event.target.value))
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name: recipeName,
            image: recipeImage,
            summary: recipeSummary,
            steps: [...steps],
            healthScore: recipeHealthScore,
            diets: [...diet],
        }

        try {
            setModalVisible(true);

            dispatch(postRecipe(formData));

            setRecipeName('');
            setRecipeImage('');
            setRecipeSummary('');
            setSteps([]);
            setCurrentStep('');
            setRecipeHealthScore(0);
            setDiet([]);
        } catch (error) {
            console.error(error);
        }
    };

    const isSubmitButtonEnabled = steps.length > 0 && Object.keys(errors).length === 0;

    return (
        <form className='form__container' onSubmit={handleSubmit}>

            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <div className='form__modal'>
                    <span className='checkmark'></span>
                    <h2 className='modal__title'>WELL DONE RECIPE CREATE!!</h2>
                    <Link className='modal__button' to='/home'>Done</Link>
                </div>
            </Modal>

            <div className='form__input__container'>
                {/* Form title */}
                <div className='form__title'>
                    <label className='form__label'>#Title:</label>
                    <div className='form__input'>
                        <input
                            type="text"
                            placeholder='Enter recipe title'
                            name="name" value={recipeName}
                            onChange={event => setRecipeName(event.target.value)}
                        />
                        {errors.name && <p className='form__error'>{errors.name}</p>}
                    </div>
                </div>

                {/* Form image */}
                <div className='form__image'>
                    <label className='form__label'>#Image: </label>
                    <div className='form__input'>
                        <input
                            type="text"
                            placeholder='Enter a URL image...'
                            name="image"
                            onChange={event => setRecipeImage(event.target.value)}
                        />
                        {errors.image && <p className='form__error'>{errors.image}</p>}
                    </div>
                </div>


                {/* Form summary */}
                <div className='form__summary'>
                    <label className='form__label'>#Summary:</label>
                    <div className="form__textarea">
                        <textarea
                            placeholder='Enter recipe summary'
                            name="summary" value={recipeSummary}
                            onChange={event => setRecipeSummary(event.target.value)}
                        />
                        {errors.summary && <p className='form__error'>{errors.summary}</p>}
                    </div>
                </div>

                {/* Form steps */}
                <div className="form__steps">
                    <label className="form__label">#Steps:</label>
                    <button
                        className='button__add'
                        type="button"
                        onClick={editingStep ? handleSaveStep : handleAddStep}
                        disabled={editingStep || errorStep ? disabled : false}
                    >
                        {editingStep ? 'Save Edit' : 'Add Step'}
                    </button>
                    {editingStep && (
                        <button className='button__cancel' type="button" onClick={() => {
                            setEditingStep('');
                            setCurrentStep('');
                        }}>
                            Cancel Edit
                        </button>
                    )}
                    <div className="form__textarea">
                        <textarea
                            value={currentStep}
                            placeholder="Enter a step"
                            onChange={(event) => {
                                setCurrentStep(event.target.value);
                                isStepButtonDisabled(); // Llamada a la función para actualizar el estado disabled
                            }}
                        />
                        {errors.steps && <p className='form__error'>{errors.steps}</p>}
                        {errorStep && <p className='form__error'>{errorStep}</p>}
                    </div>
                    <ul>
                        {steps.map((step, index) => (
                            <li key={index}>
                                {index + 1} - {step}
                                <button className='button__edit' type="button" onClick={() => handleEditStep(index)}>
                                </button>
                                <button className='button__delete' type="button" onClick={() => handleDeleteStep(index)}>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Health score */}
                <div className='form__score'>
                    <label className='form__label'>#Health Score: {recipeHealthScore}</label>
                    <div className="form__range">
                        <input
                            type="range"
                            name="healthScore" value={recipeHealthScore}
                            onChange={event => setRecipeHealthScore(event.target.value)}
                        />
                    </div>
                </div>

                {/* Diets */}
                <div className='form__diets'>
                    <label className='form__label'>#Diets</label>
                    <div className="form__input__diets">
                        {diets?.map(diet => (
                            <label key={diet} className='form__label__diets'>
                                <input
                                    type="checkbox"
                                    name={diet}
                                    value={diet}
                                    onChange={event => handleDiets(event)}
                                />
                                {diet.charAt(0).toUpperCase() + diet.slice(1)}
                            </label>
                        ))}
                    </div>
                    {errors.diet && <p className='form__error'>{errors.diet}</p>}
                </div>

                {/* Button submit */}
                <input className='form__submit' type="submit" value="Submit" disabled={!isSubmitButtonEnabled} />
            </div>
        </form >

    )
}

export default FormNewRecipe