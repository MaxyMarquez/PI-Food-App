const router = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require('./recipes');
const diets = require('./diets');
const createRecipeRouter = require('../controllers/postRecipe');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipes);
router.use('/diets', diets); // Usar el router de las dietas en la ruta '/diets'
router.post('/create_recipe', createRecipeRouter);

module.exports = router;
