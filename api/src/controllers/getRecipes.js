require('dotenv').config();
const axios = require('axios');
const { Recipe, Diet } = require('../db')

const { API_URL, API_KEY } = process.env;

// Función para traer de la API las 100 primeras recipes
const getRecipesAPI = async () => {
    try {
        // Solicitud GET a la API.
        const { data } = await axios.get(API_URL, {

            //Parámetros especificos de la API (End Points).
            params: {
                addRecipeInformation: true,
                number: 100,
                apiKey: API_KEY,
            },
        });
        console.log(data);
        // Proceso los datos y los mapeo para obtener información relevante de cada receta.
        const recipes = await data.results?.map(data => ({
            id: data.id,
            title: data.title,
            image: data.image,
            summary: data.summary,
            healthScore: data.healthScore,
            readyInMinutes: data.readyInMinutes,
            servings: data.servings,
            steps: data.analyzedInstructions[0] && data.analyzedInstructions[0].steps
                ? data.analyzedInstructions[0].steps?.map(step => step.step)
                : null,
            ingredients: data.analyzedInstructions[0] && data.analyzedInstructions[0].steps
                ? [...new Set(data.analyzedInstructions[0].steps.flatMap(step => step.ingredients.map(ingredient => ingredient.name)))]
                : null,
            diets: data.diets,
        }));

        return recipes;
    } catch (error) {
        console.error(error);
    }
};

// Función para traer todas las recipes de la base de datos.
const getRecipesDB = async () => {
    const recipe = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })

    const recipesDB = await recipe.map(data => {
        return {
            id: data.id,
            title: data.name,
            image: data.image,
            healthScore: data.healthScore,
            summary: data.summary,
            steps: data.steps,
            diets: data.diets.map(diet => diet.name),
            created: true,
        }
    })
    return recipesDB
};

// Función que concatena los resultados de la base de datos con los de la API.
const getAllRecipes = async () => {
    const recipeApi = await getRecipesAPI();
    const recipeDB = await getRecipesDB();

    return recipeDB.concat(recipeApi)
}

// Función que filtra por nombre, dieta y tiene la propiedad created. 
const getFilteredRecipes = async (name, diet, isCreated) => {
    const allRecipes = await getAllRecipes();

    let recipes = allRecipes;

    if (name) {
        recipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()));
    }

    if (diet) {
        recipes = recipes.filter(recipe => recipe.diets.includes(diet.toLowerCase()));
    }

    if (isCreated === 'created') {
        recipes = recipes.filter(recipe => recipe.hasOwnProperty('created'));
    } else if (isCreated === 'notCreated') {
        recipes = recipes.filter(recipe => !recipe.hasOwnProperty('created'));
    } else if (isCreated === 'all') {
        return recipes
    }

    return recipes;
}

// Función que devuelve una receta filtrado por ID
const getRecipeByID = async id => {
    try {
        const recipes = await getAllRecipes();

        const recipe = recipes.find(result => result.id.toString() === id)

        return recipe
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getAllRecipes, getRecipeByID, getFilteredRecipes };