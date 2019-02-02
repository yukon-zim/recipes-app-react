import React from 'react';
import PropTypes from 'prop-types';
import recipeDetail from '../recipe-detail';
import CreateRecipeButtons from './CreateRecipeButtons';

const CreateRecipeDetail = recipeDetail(CreateRecipeButtons);

const CreateRecipe = props => (
    <CreateRecipeDetail
        {...props}
        newRecipeMode={true}
        user={props.user}>
    </CreateRecipeDetail>
);

CreateRecipe.propTypes = {
    user: PropTypes.object
};

export default CreateRecipe;