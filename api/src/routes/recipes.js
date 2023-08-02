const router = require('express').Router();
const { deleteRecipe } = require('../controllers/deleteRecipe.js');
const { getRecipeByID, getFilteredRecipes } = require('../controllers/getRecipes.js');

// Ruta GET que devuleve todas las recetas, y tambien filtra por nombre y dieta. 
router.get('/', async (req, res) => {
    const { name, diet, created } = req.query;
    try {

        const recipes = await getFilteredRecipes(name, diet, created);

        res.json(recipes);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Ruta GET que devuelve una receta filtrada por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await getRecipeByID(id);

        res.json(recipe);
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deleteRecipe(id);

        res.send('Recipe Delete Successful')
    } catch (error) {
        res.status(500).send('Error Deleting Recipe');
    }
});

module.exports = router;
