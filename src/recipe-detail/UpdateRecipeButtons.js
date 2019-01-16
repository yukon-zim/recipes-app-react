import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { ALL_RECIPES_QUERY } from '../recipe-list/recipe-list';
import User from '../login/User';
import Button from '../style/Button';

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

    updateRecipe = async (updateRecipeMutation) => {
        try {
            const res = await updateRecipeMutation({
                variables: {
                    ...this.props.recipe
                }
            });
            this.props.resetForm();
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
                        id: this.props.recipe.id
                    }
                });
                this.goToListView();
                return res;
            } catch (err) {
                console.error(err.message);
            }
        }
    };

    goToListView = () => {
        this.props.history.push('/recipes');
    };


    render() {
        return (
            <User>
                {({data}) => (
                    <div>
                        {!data.whoAmI && (
                            <div>
                                <h5>Sign in to edit recipes!</h5>
                            </div>
                        )}
                        {data.whoAmI && (
                            <div className="recipe-form-buttons">
                                <Mutation
                                    mutation={UPDATE_RECIPE_MUTATION}
                                >
                                    {(updateRecipe, {error}) => (
                                        <React.Fragment>
                                            {error && (
                                                <p className="error-message">{error}</p>
                                            )}
                                            <Button
                                                update
                                                type="button"
                                                className="btn btn-primary btn-update-recipe"
                                                onClick={async () => this.updateRecipe(updateRecipe)}
                                                disabled={!this.props.formIsDirty || !this.props.formIsValid}>Update
                                                recipe</Button>
                                        </React.Fragment>
                                    )}
                                </Mutation>
                                <Mutation
                                    mutation={DELETE_RECIPE_MUTATION}
                                    refetchQueries={[{query: ALL_RECIPES_QUERY, variables: {searchTerm: ''}}]}
                                >
                                    {(deleteRecipe, {error}) => (
                                        <React.Fragment>
                                            {error && (
                                                <p className="error-message">{error.message}</p>
                                            )}
                                            <Button
                                                delete
                                                type="button"
                                                className="btn btn-warning btn-delete-recipe"
                                                onClick={async () => this.deleteRecipe(deleteRecipe)}>Delete recipe</Button>
                                        </React.Fragment>
                                    )}
                                </Mutation>
                            </div>
                        )}
                    </div>
                )}
            </User>
        )
    }
}

export default withRouter(UpdateRecipeButtons)
