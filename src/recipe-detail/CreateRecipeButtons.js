import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { RecipeDetailContext } from './recipe-detail';
import { ALL_RECIPES_QUERY } from '../recipe-list/recipe-list';

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
    static contextType = RecipeDetailContext;

    saveNewRecipe = async (createRecipeMutation) => {
        try {
            const res = await createRecipeMutation({
                variables: {
                    ...this.context.recipe
                }
            });
            this.context.resetForm();
            console.log(res);
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
                <Mutation
                    mutation={CREATE_RECIPE_MUTATION}
                    refetchQueries={[{query: ALL_RECIPES_QUERY, variables:{searchTerm: ''}}]}
                >
                    {(createRecipe, { error }) => (
                        <React.Fragment>
                            {error && (
                                <p className="error-message">{error}</p>
                            )}
                            <button className="btn btn-primary btn-save-new-recipe"
                                    disabled={!this.context.formIsDirty || !this.context.formIsValid}
                                    onClick={async () => this.saveNewRecipe(createRecipe)}>Save new recipe</button>
                        </React.Fragment>
                    )}
                </Mutation>
            </div>
        )
    }

};

export default withRouter(CreateRecipeButtons);