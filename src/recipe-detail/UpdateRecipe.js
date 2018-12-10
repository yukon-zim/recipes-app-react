import React from 'react';
import RecipeDetail from './recipe-detail';
import UpdateRecipeButtons from './UpdateRecipeButtons';

const UpdateRecipe = props => (
    <RecipeDetail
        id={props.match.params.id}
        newRecipeMode={false}>
            <UpdateRecipeButtons/>
    </RecipeDetail>
);

export default UpdateRecipe;