import React from 'react';
import RecipeDetail from './recipe-detail';

const CreateRecipe = props => (
    <RecipeDetail
    id={'new'}
    newRecipeMode={true}>
        <button>Save new recipe</button>
    </RecipeDetail>
);

export default CreateRecipe;