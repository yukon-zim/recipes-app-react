import React from 'react';
import RecipeDetail from './recipe-detail';

const UpdateRecipe = props => (
    <RecipeDetail
        id={props.match.params.id}
        newRecipeMode={false}>
        <button>Update recipe</button>
    </RecipeDetail>
);

export default UpdateRecipe;