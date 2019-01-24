import React from 'react';
import recipeDetail from '../recipe-detail';
import CreateRecipeButtons from './CreateRecipeButtons';

const CreateRecipeDetail = recipeDetail(CreateRecipeButtons);

const CreateRecipe = props => (
    <CreateRecipeDetail
        {...props}
        id={'new'}
        newRecipeMode={true}
        user={props.user}>
    </CreateRecipeDetail>
);

export default CreateRecipe;