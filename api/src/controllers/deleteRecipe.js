const { Recipe } = require('../db');

const deleteRecipe = async (id) => {
    try {
        await Recipe.destroy({
            where: {
                id,
            }
        })
        console.log('Recipe Deleted Successful');
    } catch (error) {
        console.error(error)
    }
};

module.exports = { deleteRecipe };