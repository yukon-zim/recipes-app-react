import React from 'react';
import RecipeDetail from './recipe-detail';
import CreateRecipeButtons from './CreateRecipeButtons';

const CreateRecipe = props => (
    <RecipeDetail
        id={'new'}
        newRecipeMode={true}>
        <CreateRecipeButtons/>
    </RecipeDetail>
);

export default CreateRecipe;