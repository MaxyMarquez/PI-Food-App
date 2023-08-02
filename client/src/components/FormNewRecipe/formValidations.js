const validations = ({ name, summary, image, steps, diet }, recipes) => {
    const errors = {};

    const regexURL = /^https?:\/\/.*\/.*\.(png|jpeg|jpg)\??.*$/gmi

    const isTitleExist = name => recipes.some(recipe => recipe.title === name)

    if (isTitleExist(name)) {
        errors.name = '* Title is already in use'
    }
    if (!name) {
        errors.name = '* You must put a title to your recipe'
    } else if (name.length > 45) {
        errors.name = '* The title of your recipe should not be longer than 45 characters'
    }

    if (!summary) {
        errors.summary = '* You must write a summary to your recipe.'
    } else if (summary.length > 1500) {
        errors.summary = '* Your summary of your recipe should not be longer than 1500 characters.'
    }

    if (!image) {
        errors.image = '* You must enter an URL image to your recipe. Example: www.example.com/image.jpg'
    } else if (!regexURL.test(image)) {
        errors.image = '* Invalid image format. png | jpeg| jpg are valid'
    }

    if (steps.length < 1) {
        errors.steps = '* You must enter a step'
    }

    if (!diet.length) {
        errors.diet = '* You must choose at least one option. '
    }

    return errors;
}

export default validations;