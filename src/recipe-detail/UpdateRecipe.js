import React from 'react';
import RecipeDetail from './recipe-detail';
import UpdateRecipeButtons from './UpdateRecipeButtons';
import gql from 'graphql-tag';
import { Query } from 'react-apollo'

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
    return JSON.parse(JSON.stringify(data));
}

const UpdateRecipe = props => {
    const id = props.match.params.id;
    return(
        <Query
            query={GET_RECIPE_QUERY}
            variables={{id}}
        >
            {({data, error, loading}) => {
                if (error) {
                    console.error(error);
                    return <p className="error-message">Couldn't find the recipe with ID {id}</p>;
                }
                if (loading) {
                    return <p>loading recipe</p>;
                } else {
                    const recipeCopy = deepCopy(data.recipe);
                    return (
                        <RecipeDetail
                            recipe={recipeCopy}
                            newRecipeMode={false}>
                            <UpdateRecipeButtons/>
                        </RecipeDetail>
                    )
                }
            }}
        </Query>
    )};

export default UpdateRecipe;