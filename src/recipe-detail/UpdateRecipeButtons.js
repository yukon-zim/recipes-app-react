import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { RecipeDetailContext } from './recipe-detail';
import { ALL_RECIPES_QUERY } from '../recipe-list/recipe-list';

const DELETE_RECIPE_MUTATION = gql`
    mutation DELETE_RECIPE_MUTATION($id: ID!) {
        deleteRecipe(id: $id) {
            message
        }
    }
`;

const UPDATE_RECIPE_MUTATION = gql`
    mutation UPDATE_RECIPE_MUTATION($id: ID!, $name: String!, $category: String, $numberOfServings: String, $ingredients: [String!]!, $instructions: [String!]!, $notes: String) {
        editRecipe(id: $id, name: $name, category: $category, numberOfServings: $numberOfServings, ingredients: $ingredients, instructions: $instructions, notes: $notes) {
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

class UpdateRecipeButtons extends Component {
    static contextType = RecipeDetailContext;

    updateRecipe = async (updateRecipeMutation) => {
        try {
            const res = await updateRecipeMutation({
                variables: {
                    ...this.context.recipe
                }
            });
            this.context.resetForm();
            return res;
        } catch (err) {
            console.error(err);
        }
    };

    deleteRecipe = async (deleteRecipeMutation) => {
        if (window.confirm(`Are you sure you want to delete this recipe? This action cannot be undone.`)) {
            try {
                const res = await deleteRecipeMutation({
                    variables: {
                        id: this.context.recipe.id
                    }
                });
                this.goToListView();
                return res;
            } catch (err) {
                console.error(err);
            }
        }
    };

    goToListView = () => {
        this.props.history.push('/recipes');
    };


    render() {
        return (

            <div>
                <Mutation
                    mutation={UPDATE_RECIPE_MUTATION}
                >
                    {(updateRecipe, { error }) => (
                        <React.Fragment>
                            {error && (
                                <p className="error-message">{error}</p>
                            )}
                            <button
                                className="btn btn-primary btn-update-recipe"
                                onClick={async () => this.updateRecipe(updateRecipe)}
                                disabled={!this.context.formIsDirty || !this.context.formIsValid}>Update recipe</button>
                        </React.Fragment>
                    )}
                </Mutation>
                <Mutation
                    mutation={DELETE_RECIPE_MUTATION}
                    refetchQueries={[{query: ALL_RECIPES_QUERY, variables:{searchTerm: ''}}]}
                >
                    {(deleteRecipe, { error }) => (
                        <React.Fragment>
                            {error && (
                                <p className="error-message">{error}</p>
                            )}
                            <button
                                className="btn btn-warning btn-delete-recipe"
                                onClick={async () => this.deleteRecipe(deleteRecipe)}>Delete recipe</button>
                        </React.Fragment>
                    )}
                </Mutation>
            </div>
        )
    }
};

export default withRouter(UpdateRecipeButtons)