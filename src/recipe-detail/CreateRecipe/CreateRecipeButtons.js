import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { ALL_RECIPES_QUERY } from '../../recipe-list/recipe-list';
import Button from '../../style/Button';

const CREATE_RECIPE_MUTATION = gql`
    mutation CREATE_RECIPE_MUTATION($name: String!, $category: String, $numberOfServings: String, $ingredients: [String!]!, $instructions: [String!]!, $notes: String) {
        addRecipe(name: $name, category: $category, numberOfServings: $numberOfServings, ingredients: $ingredients, instructions: $instructions, notes: $notes) {
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

class CreateRecipeButtons extends Component {

    saveNewRecipe = async (createRecipeMutation) => {
        try {
            const res = await createRecipeMutation({
                variables: {
                    ...this.props.recipe
                }
            });
            this.props.resetForm();
            this.goToId(res.data.addRecipe.id);
            return res;
        } catch (err) {
            this.setState({
                formError: err.message
            });
        }
    };

    goToId = (recipeId) => {
        this.props.history.push(`/detail/${recipeId}`);
    };

    render() {
        return (
            <div>
                {!this.props.user && (
                    <div>
                        <h5>Sign in to create recipes!</h5>
                    </div>
                )}
                {this.props.user && (
                    <div className="recipe-form-buttons">
                        <Mutation
                            mutation={CREATE_RECIPE_MUTATION}
                            refetchQueries={[{query: ALL_RECIPES_QUERY, variables:{searchTerm: ''}}]}
                        >
                            {(createRecipe, { error }) => (
                                <React.Fragment>
                                    {error && (
                                        <p className="error-message">{error.message}</p>
                                    )}
                                    <Button
                                        create
                                        className="btn btn-primary btn-save-new-recipe"
                                            type="button"
                                            disabled={!this.props.formIsDirty || !this.props.formIsValid}
                                            onMouseDown={async () => this.saveNewRecipe(createRecipe)}>Save new recipe</Button>
                                </React.Fragment>
                            )}
                        </Mutation>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(CreateRecipeButtons);
export { CREATE_RECIPE_MUTATION };
