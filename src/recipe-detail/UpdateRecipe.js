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

const UpdateRecipe = props => {
    const id = props.match.params.id;
    return(
        <Query
            query={GET_RECIPE_QUERY}
            variables={{id}}
            // TODO: individual recipes must be fetched each time they are loaded
            // if they are loaded from cache, unsaved updates will persist after navigating around the app
            // this creates a mismatch between local recipe data and db recipe data
            // best guess is that apollo cache is not being read correctly when navigating back to unsaved recipe
            // not caching is acceptable for now since individual recipes aren't resource intensive
            fetchPolicy="no-cache"
        >
            {({data, error, loading}) => {
                if (error) {
                    console.error(error);
                    return <p className="error-message">Couldn't find the recipe with ID {id}</p>;
                }
                if (loading) {
                    return <p>loading recipe</p>;
                } else {
                    return (
                        <RecipeDetail
                            recipe={data.recipe}
                            newRecipeMode={false}>
                            <UpdateRecipeButtons/>
                        </RecipeDetail>
                    )
                }
            }}
        </Query>
    )};

export default UpdateRecipe;