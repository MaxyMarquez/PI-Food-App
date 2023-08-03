import axios from 'axios';

export const POST_RESPONSE = 'POST_RESPONSE';
export const GET_DIETS = 'GET_DIETS';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SEARCH_RECIPES = 'SEARCH_RECIPES'
export const SORT_RECIPES = 'SORT_RECIPES';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export const getRecipes = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('/recipes')
            dispatch({
                type: GET_RECIPES,
                payload: {
                    recipes: data,
                    currentPage: 1,
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export const getRecipeByID = id => {
    return async dispatch => {
        try {
            dispatch({
                type: GET_RECIPE_BY_ID,
                payload: {}
            });

            const { data } = await axios.get(`/recipes/${id}`);

            dispatch({
                type: GET_RECIPE_BY_ID,
                payload: data
            });

        } catch (error) {
            console.error(error);
        }
    };
};

export const getDiets = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('/diets');
            dispatch({
                type: GET_DIETS,
                payload: data
            });
        } catch (error) {
            console.error('error');
        }
    };
};

export const postRecipe = (info) => {
    return async dispatch => {
        try {
            const response = await axios.post('/recipes', info);

            dispatch({
                type: POST_RESPONSE,
                payload: response.status,
            });
        } catch (error) {
            console.error(error)
        }
    };
};

export const deleteRecipe = (id) => {
    return async dispatch => {
        try {
            await axios.delete(`/recipes/${id}`);

            dispatch({
                type: DELETE_RECIPE,
                payload: id
            })
        } catch (error) {

        }
    }
}

export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page,
    };
};

export const searchRecipes = (searchTerm, selectedDiet, isCreated) => {
    return async (dispatch) => {
        try {

            let url = '/recipes';

            if (searchTerm) {
                url += `?name=${searchTerm}`;
            }

            if (selectedDiet) {
                url += searchTerm ? `&diet=${selectedDiet.toLowerCase()}` : `?diet=${selectedDiet.toLowerCase()}`;
            }

            if (isCreated) {
                url += searchTerm && selectedDiet ? `&created=${isCreated}`
                    : searchTerm || selectedDiet ? `&created=${isCreated}`
                        : `?created=${isCreated}`
            }

            const { data } = await axios.get(url);

            dispatch({
                type: SEARCH_RECIPES,
                payload: {
                    recipes: data,
                    searchTerm: searchTerm,
                    selectedDiet: selectedDiet,
                    isCreated: isCreated,
                    currentPage: 1,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const sortRecipes = (orderBy) => {
    return {
        type: SORT_RECIPES,
        payload: orderBy,
    };
};