import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { cloneDeep } from 'lodash';
import recipeDetail from '../recipe-detail';
import UpdateRecipeButtons from './UpdateRecipeButtons';
import PropTypes from 'prop-types';

const GET_RECIPE_QUERY = gql`
    query GET_RECIPE_QUERY($id: ID!) {
        recipe(id: $id) {
            id
            name
            category
            numberOfServings
            ingredients
            instructions
            dateCreated
            dateModified
            notes
        }
    }
`;

function deepCopy(data) {
    if (data === undefined) {
        return data;
    }
    return cloneDeep(data);
}

const UpdateRecipeDetail = recipeDetail(UpdateRecipeButtons);

function UpdateRecipe(props) {
    const id = props.match.params.id;
    return(
        <Query
            query={GET_RECIPE_QUERY}
            variables={{ id }}
        >
            {({ data, error, loading }) => {
                if (error) {
                    console.error(error);
                    return <p className="error-message">Couldn't find the recipe with ID {id}</p>;
                }
                if (loading) {
                    return <p>loading recipe</p>;
                } else {
                    const recipeCopy = deepCopy(data.recipe);
                    return (
                        <UpdateRecipeDetail
                            {...props}
                            recipe={recipeCopy}
                            newRecipeMode={false}
                            user={props.user}>
                        </UpdateRecipeDetail>
                    )
                }
            }}
        </Query>
    )}

UpdateRecipe.propTypes = {
    user: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default UpdateRecipe;
export { GET_RECIPE_QUERY };