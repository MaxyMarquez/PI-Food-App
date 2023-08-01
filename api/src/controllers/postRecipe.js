const { Recipe, Diet } = require('../db');

const createRecipe = async (req, res) => {
    try {
        const { name, image, summary, healthScore, steps, diets } = req.body;

        const newRecipe = await Recipe.create({
            name,
            image,
            summary,
            healthScore,
            steps,
        });


        const addDietsToDb = await Diet.findAll({
            where: {
                name: diets,
            }
        });

        await newRecipe.addDiet(addDietsToDb);

        res.send(newRecipe);
    } catch (error) {
        console.error(error);
    }
}

module.exports = createRecipe;
