const { Diet } = require('../db');
const { getAllRecipes } = require('../controllers/getRecipes');

// Función para obtener los distintos tipos de dieta de la API e insertarlas en la base de datos
const addDiets = async () => {
    try {
        //Resultados de la API
        const recipes = await getAllRecipes();

        const arrDiets = ['vegetarian', 'vegan', 'gluten free'];

        // Extraer las dietas de cada receta y agregarlas al array arrDiets
        recipes.forEach(recipe => {
            recipe.diets.forEach(diet => arrDiets.push(diet));
        });

        // Inserta las dietas, si no existen, en la tabla 'diets' de la base de datos
        arrDiets.map(async diet => {
            try {
                await Diet.findOrCreate({
                    where: {
                        name: diet,
                    }
                })
            } catch (error) {
                console.error(error);
            }
        })
    } catch (error) {
        console.error("Error al agregar las dietas:", error);
    }
};

addDiets();

const getDiets = async () => {
    return await Diet.findAll();
}

module.exports = { getDiets };


