import React, {Component} from 'react';
import { RecipeDetailContext } from './recipe-detail';

export default class UpdateRecipeButtons extends Component {
    static contextType = RecipeDetailContext;

    render() {
        return (
            <div>
                <button
                    className="btn btn-primary btn-update-recipe"
                    onClick={() => this.context.updateRecipe()}
                    disabled={!this.context.formIsDirty || !this.context.formIsValid}>Update recipe</button>
                <button
                    className="btn btn-warning btn-delete-recipe"
                    onClick={() => this.context.deleteRecipe()}>Delete recipe</button>
            </div>
        )
    }
};