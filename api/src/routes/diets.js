const router = require('express').Router();
const { getDiets } = require('../controllers/getDiets');

router.get('/', async (req, res) => {
    const allDiets = await getDiets();
    const diets = allDiets?.map(diet => diet.name)
    res.json(diets);
})

module.exports = router;
