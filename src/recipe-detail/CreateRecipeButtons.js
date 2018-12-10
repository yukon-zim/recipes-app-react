import React, {Component} from 'react';
import { RecipeDetailContext } from './recipe-detail';

export default class CreateRecipeButtons extends Component {
    static contextType = RecipeDetailContext;

    render() {
        return (
            <div>
                <button className="btn btn-primary btn-save-new-recipe"
                        disabled={!this.context.formIsDirty || !this.context.formIsValid}
                        onClick={() => this.context.saveNewRecipe()}>Save new recipe</button>
            </div>
        )
    }

};

